import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
} from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools";
import agent from "./agent";

//const provider = new ethers.providers.EtherscanProvider(
// "homestead",
//"7TY68RZP4EI89Z3YYYVVP9WB6TES3G8HAY"
//);

describe("phising agent", () => {
  let txEvent: TestTransactionEvent;
  let mockProvider: any;
  let handleTransaction: HandleTransaction;

  beforeEach(() => {
    txEvent = new TestTransactionEvent();
    mockProvider = { getCode: jest.fn() };
    handleTransaction = agent.provideHandleTransaction(mockProvider);
  });

  describe("handleTransaction", () => {});
});
