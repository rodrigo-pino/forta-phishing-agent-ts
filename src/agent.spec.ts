import { BigNumber } from "ethers";
import { Finding, HandleTransaction } from "forta-agent";
import agent from "./agent";
import { BLOCK_RANGE, TIMES_DETECTED } from "./const";
import { phishingAlert, SpenderActivity, TestUtils } from "./utils";

describe("phising agent", () => {
  let mockProvider: any;
  let handleTransaction: HandleTransaction;
  let victims: string[];
  let contracts: string[];
  let amounts: string[];

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
    for (let i = 1; i <= total; i++) {
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

  beforeEach(() => {
    mockProvider = { getCode: jest.fn() };
    handleTransaction = agent.provideHandleTransaction(mockProvider);
    victims = ["0x1234", "0x4567", "0x89012"];
    contracts = ["0xababa", "0xbabab"];
    amounts = ["0xfffff"];
  });

  it("returns no findings if spender is a contract", async () => {
    const spender = "0xeeeee";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0xabcde");

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

    // Amount must be zero
    const amounts = ["0x0"];

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  it("returns no findings if spender is zero address", async () => {
    const spender = "0x0000000000000000000000000000000000000000";
    const blockSpace = Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

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

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    const suspiciousActivity: SpenderActivity[] = testUtils.suspActivity(
      blockSpace,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([
      phishingAlert(spender, suspiciousActivity),
    ]);
  });

  it("returns no finding if spender is a 'normal' EOA but activity is outside BLOCK_RANGE", async () => {
    const spender = "0x11111";
    const blockSpace = 2 * Math.floor(BLOCK_RANGE / TIMES_DETECTED);
    mockProvider.getCode.mockResolvedValue("0x");

    const findings: Finding[] = await doTransactions(
      blockSpace,
      spender,
      victims,
      contracts,
      amounts
    );

    expect(findings).toStrictEqual([]);
  });

  it("returns two findings when 2 of 4 'normal' EOA spenders are detected", async () => {
    const spenders = [
      "0x1111", // Normal EOA
      "0x2222", // Normal EOA
      "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", // Binance Exchange
      "0xeeee", // Smart Contract
    ];
    // return code when request from contract address
    mockProvider.getCode = (addr: string) =>
      addr === "0xeeee" ? "0xabcde" : "0x";

    const blockSpace = Math.floor(BLOCK_RANGE / (TIMES_DETECTED * 2));

    const suspActivity1: SpenderActivity[] = [];
    const suspActivity2: SpenderActivity[] = [];

    const allFindings: Finding[][] = [];
    for (let i = 1; i <= TIMES_DETECTED * 2; i++) {
      const eoaSpender = spenders[i % 2];
      const otherSpender = spenders[(i % 2) + 2];

      // Creating EOA transaction
      const tx1 = testUtils.createTxEvent(
        blockSpace * i,
        victims[i % victims.length],
        contracts[i % contracts.length],
        eoaSpender,
        BigNumber.from(amounts[i % amounts.length]),
        ""
      );

      // Creating Exchange or Smart Contrat transaction
      const tx2 = testUtils.createTxEvent(
        blockSpace * i,
        victims[i % victims.length],
        contracts[i % contracts.length],
        otherSpender,
        BigNumber.from(amounts[i % amounts.length]),
        ""
      );

      // Handling both transactions
      allFindings.push(await handleTransaction(tx1));
      allFindings.push(await handleTransaction(tx2));

      // Simulate generation of suspicious log for EOA
      // and adding it accordingly
      const susp = new SpenderActivity(
        blockSpace * i,
        "",
        victims[i % victims.length],
        contracts[i % contracts.length],
        BigNumber.from(amounts[i % amounts.length])
      );
      eoaSpender === "0x1111"
        ? suspActivity1.push(susp)
        : suspActivity2.push(susp);
    }

    expect(allFindings.flat()).toStrictEqual([
      phishingAlert(spenders[1], suspActivity2),
      phishingAlert(spenders[0], suspActivity1),
    ]);
  });
});
