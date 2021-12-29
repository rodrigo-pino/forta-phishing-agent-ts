import { BigNumber } from "ethers";
import { Finding, HandleTransaction } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools";
import agent from "./agent";
import { BLOCK_RANGE, TIMES_DETECTED } from "./const";
import { phishingAlert, TestUtils } from "./utils";

//const provider = new ethers.providers.EtherscanProvider(
// "homestead",
//"7TY68RZP4EI89Z3YYYVVP9WB6TES3G8HAY"
//);

describe("phising agent", () => {
  let mockProvider: any;
  let handleTransaction: HandleTransaction;
  const testUtils = new TestUtils();

  const doTransactions = async (
    blockSpace: number,
    spender: string,
    victims: string[],
    contracts: string[],
    amounts: string[],
    total: number = TIMES_DETECTED
  ) => {
    const allFindings: Finding[][] = [];
    for (let i = 1; i <= TIMES_DETECTED; i++) {
      const txEvent = testUtils.createTxEvent(
        blockSpace * i,
        victims[i % victims.length],
        contracts[i % contracts.length],
        spender,
        BigNumber.from(amounts[i % amounts.length])
      );
      allFindings.push(await handleTransaction(txEvent));
    }
    return allFindings.flat();
  };

  const doSuspActivity = () => {};

  beforeEach(() => {
    mockProvider = { getCode: jest.fn() };
    handleTransaction = agent.provideHandleTransaction(mockProvider);
  });

  it("returns no findings if spender is a contract", async () => {
    const spender = "0xeeeee";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0xabcde");

    const victims = ["0x1234", "0x4567", "0x89012"];
    const contracts = ["0xababa", "0xbabab"];
    const amounts = ["0xfffff"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  it("returns no findings if spender is an exchange", async () => {
    const spender = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be"; // Binance
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const victims = ["0x1234", "0x4567", "0x89012"];
    const contracts = ["0xababa", "0xbabab"];
    const amounts = ["0xfffff"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  it("returns no findings if amount is set to zero", async () => {
    const spender = "0x11111";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const victims = ["0x1234", "0x4567", "0x89012"];
    const contracts = ["0xababa", "0xbabab"];
    const amounts = ["0x"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  it("returns a finding if spender is a 'normal' EOA", async () => {
    const spender = "0x11111";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const victims = ["0x1234", "0x4567", "0x89012"];
    const contracts = ["0xababa", "0xbabab"];
    const amounts = ["0xfffff"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([phishingAlert()]);
  });

  it("returns no finding if spender is a 'normal' EOA but activity is outside BLOCK_RANGE", async () => {
    const spender = "0x11111";
    const blockSpace = 2 * Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const victims = ["0x1234", "0x4567", "0x89012"];
    const contracts = ["0xababa", "0xbabab"];
    const amounts = ["0xfffff"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  //this one is exploding
  it("returns multiple findings when multiple 'normal' EOA spenders are detected", async () => {
    const spenders = [
      "0x2222", // Normal EOA
      "0x3333", // Normal EOA
      "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", // Binance Exchange
      "0x1111", // Smart Contract
    ];
    const blockSpace = Math.floor(BLOCK_RANGE / (TIMES_DETECTED * 4));
    mockProvider.getCode("0x");

    const allFindings: Finding[][] = [];
    for (let i = 1; i <= TIMES_DETECTED * 2; i++) {
      const eoaSpender = spenders[i % 2];
      const otherSpender = spenders[(i % 2) + 2];

      const code = (i % 2) + 2 === 3 ? "0xabcde" : "0x";
      mockProvider.getCode.mockResolvedValue(code);

      const tx1 = createTxEvent(blockSpace * i, eoaSpender);
      const tx2 = createTxEvent(blockSpace * i, otherSpender);

      allFindings.push(await handleTransaction(tx1));
      allFindings.push(await handleTransaction(tx2));
    }

    console.log(allFindings.flat());
    expect(allFindings.flat()).toStrictEqual([
      phishingAlert(),
      phishingAlert(),
    ]);
  });
});
