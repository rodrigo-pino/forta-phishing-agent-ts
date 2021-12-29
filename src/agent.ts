import BigNumber from "bignumber.js";
import {
  ethers,
  BlockEvent,
  Finding,
  HandleBlock,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
  getEthersProvider,
} from "forta-agent";
import {
  APPROVE_SIG,
  APROVAL_EVENT_SIG,
  INCREASE_ALLOWANCE_SIG,
} from "./const";
import erc20Abi from "./erc.abi.json";

const provider = getEthersProvider();
//const provider = new ethers.providers.EtherscanProvider(
// "homestead",
//"7TY68RZP4EI89Z3YYYVVP9WB6TES3G8HAY"
//);

const suspectsAddress: Map<string, Array<[number, number]>> = new Map();

const iface = new ethers.utils.Interface(erc20Abi);

function provideHandleTransaction(provider: any) {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];

    let funcCalls = txEvent.filterFunction([
      APPROVE_SIG,
      INCREASE_ALLOWANCE_SIG,
    ]);
    const funcCallsn = txEvent.filterLog(APROVAL_EVENT_SIG);

    //console.log(txEvent.traces);
    if (funcCalls.length === 0) return findings;

    console.log(funcCalls[0]);

    let contract =
      (await provider.getCode(funcCalls[0].args["spender"])) !== "0x";
    if (contract) return findings;

    //console.log(txEvent);
    console.log("Got transaction");

    for (let funcCall of funcCalls) {
      console.log("sig", funcCall.signature);
      console.log("args", funcCall.args);
    }

    try {
      let val = iface.parseTransaction({
        data: txEvent.transaction.data,
      });
      console.log("got func:", val.signature);
    } catch (error) {
      console.log("error");
      return findings;
    }

    return findings;
  };
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(provider),
};
