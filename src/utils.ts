import { BigNumber } from "ethers";
import { Finding, FindingSeverity, FindingType } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools";
import { PHISHING_ALERT, TIMES_DETECTED } from "./const";

export const phishingAlert = (
  spenderAddress: string,
  spenderActivity: SpenderActivity[]
) =>
  Finding.fromObject({
    alertId: PHISHING_ALERT,
    name: "Probable Phising Attack",
    description: `Probable phishing attack by ${spenderAddress}`,
    severity: FindingSeverity.High,
    type: FindingType.Suspicious,
    metadata: {
      spenderAddress: spenderAddress,
      transactions: spenderActivity.map((sa) => sa.transactionHash).toString(),
      affectedAddresses: spenderActivity
        .map((sa) => sa.affectedAddress)
        .toString(),
      contractAddresses: spenderActivity
        .map((sa) => sa.contractAddress)
        .toString(),
      amounts: spenderActivity.map((sa) => sa.amount.toString()).toString(),
    },
  });

export const isZeroAddress = (address: string) =>
  address === "0x0000000000000000000000000000000000000000";

export class SpenderActivity {
  readonly blockNumber: number;
  readonly transactionHash: string;
  readonly affectedAddress: string;
  readonly contractAddress: string;
  readonly amount: BigNumber;

  constructor(
    blockNumber: number,
    transactionHash: string,
    affectedAddress: string,
    contractAddress: string,
    amount: BigNumber
  ) {
    this.blockNumber = blockNumber;
    this.transactionHash = transactionHash;
    this.affectedAddress = affectedAddress;
    this.contractAddress = contractAddress;
    this.amount = amount;
  }
}

export class TestUtils {
  public createTxEvent(
    blockNum: number,
    from: string,
    to: string,
    spender: string,
    amount: BigNumber,
    txHash: string = ""
  ) {
    const txEvent = new TestTransactionEvent();
    txEvent.filterFunction = () => [
      {
        ...({} as any),
        args: { spender: spender, amount: amount },
      },
    ];
    txEvent.setTo(to);
    txEvent.setFrom(from);
    txEvent.setBlock(blockNum);
    txEvent.setHash(txHash);

    return txEvent;
  }

  public suspActivity(
    blockSpace: number,
    victims: string[],
    contracts: string[],
    amounts: string[],
    total: number = TIMES_DETECTED
  ) {
    const suspiciousActivity: SpenderActivity[] = [];
    for (let i = 1; i <= total; i++) {
      suspiciousActivity.push(
        new SpenderActivity(
          blockSpace,
          "",
          victims[i % victims.length],
          contracts[i % contracts.length],
          BigNumber.from(amounts[i % amounts.length])
        )
      );
    }

    return suspiciousActivity;
  }
}
