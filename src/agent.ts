import {
  ethers,
  Finding,
  TransactionEvent,
  getEthersProvider,
} from "forta-agent";
import {
  APPROVE_FUNC_SIG,
  BLOCK_RANGE,
  INCREASE_ALLOWANCE_FUNC_SIG,
  TIMES_DETECTED,
} from "./const";
import EXCHANGES from "./exchanges";
import { phishingAlert, isZeroAddress, SpenderActivity } from "./utils";
import { BigNumber } from "ethers";

const provider = getEthersProvider();

function provideHandleTransaction(provider: ethers.providers.JsonRpcProvider) {
  const suspiciousSpenders: Map<string, SpenderActivity[]> = new Map();
  let lastBlockNumber: number = 0;

  return async (txEvent: TransactionEvent) => {
    console.log("Transaction on block:", txEvent.blockNumber);
    const findings: Finding[] = [];

    // Select right events somehow
    let logs = txEvent.filterFunction([
      APPROVE_FUNC_SIG,
      INCREASE_ALLOWANCE_FUNC_SIG,
    ]);

    if (logs.length > 0)
      console.log(`got logs(${logs.length}):`, logs[0].signature);

    for (const log of logs) {
      const spender: string = log.args.spender;
      const amount: BigNumber = log.args.amount;
      // Do not analyze transactions from known exchanges and smart contracts
      if (
        EXCHANGES.has(spender) ||
        (await provider.getCode(spender, txEvent.blockNumber)) !== "0x" ||
        isZeroAddress(spender) ||
        amount.gt(0)
      ) {
        console.log("log belongs to contract or exchange");
        continue;
      }

      const owner: string = txEvent.from;
      const contractAddress = txEvent.to;

      let transactions = suspiciousSpenders.get(spender);
      // Block number where suspicious activity ocurred are kept
      // for the time specified.
      if (transactions === undefined) {
        console.log(`for ${spender} adding activity 1`);
        transactions = [
          new SpenderActivity(
            txEvent.blockNumber,
            txEvent.hash,
            owner,
            contractAddress !== null ? contractAddress : "0x",
            amount
          ),
        ];
        suspiciousSpenders.set(spender, transactions);
      } else {
        console.log(
          `for ${spender} adding activity ${transactions.length + 1}`
        );
        transactions.push(
          new SpenderActivity(
            txEvent.blockNumber,
            txEvent.hash,
            owner,
            contractAddress !== null ? contractAddress : "0x",
            amount
          )
        );
      }

      if (transactions.length >= TIMES_DETECTED) {
        console.log("Push findings");
        findings.push(phishingAlert());
        // stop tracking this account
        suspiciousSpenders.delete(spender);
      }
    }

    if (txEvent.blockNumber !== lastBlockNumber) {
      console.log("Updating last block number and cleaning");
      lastBlockNumber = txEvent.blockNumber;
      updateSuspicious(suspiciousSpenders, lastBlockNumber);
    }

    return findings;
  };
}

// Delete every spender's suspicious activity which occurred
// BLOCK_RANGE + 1 blocks ago
function updateSuspicious(
  suspiciousSpenders: Map<string, SpenderActivity[]>,
  blockNumber: number
) {
  suspiciousSpenders.forEach((blocks, spender) => {
    while (blockNumber - blocks[0].blockNumber > BLOCK_RANGE) {
      blocks.shift();
      if (blocks.length === 0) {
        suspiciousSpenders.delete(spender);
        return;
      }
    }
  });
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(provider),
};
