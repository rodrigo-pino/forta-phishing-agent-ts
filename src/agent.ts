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
import IGNORE_ADDRESSES from "./ignore";
import { phishingAlert, isZeroAddress, SpenderActivity } from "./utils";
import { BigNumber } from "ethers";

const provider = getEthersProvider();

function provideHandleTransaction(provider: ethers.providers.JsonRpcProvider) {
  const suspiciousSpenders: Map<string, SpenderActivity[]> = new Map();
  let lastBlockNumber: number = 0;

  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    // Select right events somehow
    let logs = txEvent.filterFunction([
      APPROVE_FUNC_SIG,
      INCREASE_ALLOWANCE_FUNC_SIG,
    ]);

    for (const log of logs) {
      const spender: string = log.args.spender;
      const amount: BigNumber = log.args.amount;
      // Do not analyze transactions from known exchanges and smart contracts
      if (
        IGNORE_ADDRESSES.has(spender) ||
        isZeroAddress(spender) ||
        amount.eq(0) ||
        (await provider.getCode(spender)) !== "0x"
      ) {
        // Log belong to contract or exchange
        continue;
      }

      //fetching transactiond data
      const owner: string = txEvent.from;
      const contractAddress: string = txEvent.to !== null ? txEvent.to : "?";

      let suspiciousActivity = suspiciousSpenders.get(spender);
      // Store suspicious activity details
      if (suspiciousActivity === undefined) {
        suspiciousActivity = [
          new SpenderActivity(
            txEvent.blockNumber,
            txEvent.hash,
            owner,
            contractAddress,
            amount
          ),
        ];
        suspiciousSpenders.set(spender, suspiciousActivity);
      } else {
        suspiciousActivity.push(
          new SpenderActivity(
            txEvent.blockNumber,
            txEvent.hash,
            owner,
            contractAddress,
            amount
          )
        );
      }

      if (suspiciousActivity.length >= TIMES_DETECTED) {
        findings.push(phishingAlert(spender, suspiciousActivity));
        // stop tracking this account
        suspiciousSpenders.delete(spender);
      }
    }

    if (txEvent.blockNumber !== lastBlockNumber) {
      lastBlockNumber = txEvent.blockNumber;
      updateSuspicious(suspiciousSpenders, lastBlockNumber);
    }

    return findings;
  };
}

// Delete every spender's suspicious activity which occurred
// BLOCK_RANGE blocks ago
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
