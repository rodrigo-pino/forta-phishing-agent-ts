import {
  ethers,
  BlockEvent,
  Finding,
  TransactionEvent,
  getEthersProvider,
} from "forta-agent";
import {
  APPROVE_FUNC_SIG,
  APROVAL_EVENT_SIG,
  BLOCK_RANGE,
  INCREASE_ALLOWANCE_FUNC_SIG,
  TIMES_DETECTED,
  TRANSFER_FROM_FUNC_SIG,
} from "./const";
import EXCHANGES from "./exchanges";
import { phishingAlert, isZeroAddress } from "./utils";

import erc20Abi from "./erc.abi.json";

const provider = getEthersProvider();
//const provider = new ethers.providers.EtherscanProvider(
// "homestead",
//"7TY68RZP4EI89Z3YYYVVP9WB6TES3G8HAY"
//);

const iface = new ethers.utils.Interface(erc20Abi);

function provideHandleTransaction(provider: any) {
  const suspiciousSpenders: Map<string, number[]> = new Map();
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
      const spender = log.args.spender;
      // Do not analyze transactions from known exchanges and smart contracts
      if (
        EXCHANGES.has(spender) ||
        (await provider.getCode(spender)) !== "0x" ||
        isZeroAddress(spender)
      ) {
        console.log("log belongs to contract or exchange");
        continue;
      }

      let transactions = suspiciousSpenders.get(spender);
      // Block number where suspicious activity ocurred are kept
      // for the time specified.
      if (transactions === undefined) {
        console.log(`for ${spender} adding activity 1`);
        transactions = [txEvent.blockNumber];
        suspiciousSpenders.set(spender, transactions);
      } else {
        console.log(
          `for ${spender} adding activity ${transactions.length + 1}`
        );
        transactions.push(txEvent.blockNumber);
      }

      if (transactions.length >= TIMES_DETECTED) {
        console.log("Push findings");
        findings.push(phishingAlert());
        // stop tracking this account
        suspiciousSpenders.delete(spender);
      }

      // experimental
      console.log(log);
      try {
        let val = iface.parseTransaction({
          data: txEvent.transaction.data,
        });
        console.log("got func:", val.signature);
      } catch (error) {
        console.log("error");
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

// In every block delete suspicious activity out of BLOCK_RANGE
function updateSuspicious(
  suspiciousSpenders: Map<string, number[]>,
  blockNumber: number
) {
  suspiciousSpenders.forEach((blocks, spender) => {
    while (blocks[0] - blockNumber > BLOCK_RANGE) {
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
