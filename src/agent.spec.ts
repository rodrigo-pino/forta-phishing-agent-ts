import { TransactionDescription } from "@ethersproject/abi";
import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  createTransactionEvent,
} from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools";
import agent from "./agent";
import { BLOCK_RANGE, TIMES_DETECTED } from "./const";
import { phishingAlert } from "./utils";

//const provider = new ethers.providers.EtherscanProvider(
// "homestead",
//"7TY68RZP4EI89Z3YYYVVP9WB6TES3G8HAY"
//);

describe("phising agent", () => {
  let mockProvider: any;
  let handleTransaction: HandleTransaction;

  const doTransactions = async (blockSpace: number, spender: string) => {
    const allFindings: Finding[][] = [];
    for (let i = 1; i <= TIMES_DETECTED; i++) {
      const txEvent = new TestTransactionEvent();
      txEvent.filterFunction = () => [
        {
          ...({} as any),
          args: { spender: spender },
        },
      ];
      txEvent.setBlock(blockSpace * i);

      allFindings.push(await handleTransaction(txEvent));
    }
    return allFindings.flat();
  };

  beforeEach(() => {
    mockProvider = { getCode: jest.fn() };
    handleTransaction = agent.provideHandleTransaction(mockProvider);
  });

  it("returns no findings if spender is a contract", async () => {
    const spender = "0x11111";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0xabcde");

    const findings: Finding[] = await doTransactions(blockSpace, spender);

    expect(findings).toStrictEqual([]);
  });

  it("returns no findings if spender is an exchange", async () => {
    const spender = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be"; // Binance
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const findings: Finding[] = await doTransactions(blockSpace, spender);

    expect(findings).toStrictEqual([]);
  });

  it("returns a finding if spender is a 'normal' EOA", async () => {
    const spender = "0x22222";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const findings: Finding[] = await doTransactions(blockSpace, spender);

    expect(findings).toStrictEqual([phishingAlert()]);
  });

  it("returns no finding if spender is a 'normal' EOA but activity is outside BLOCK_RANGE", async () => {
    const spender = "0x22222";
    const blockSpace = 2 * Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const findings: Finding[] = await doTransactions(blockSpace, spender);

    expect(findings).toStrictEqual([]);
  });
});
