import { BigNumber } from "ethers";
import { Finding, FindingSeverity, FindingType } from "forta-agent";
import { PHISHING_ALERT } from "./const";

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
      amounts: spenderActivity.map((sa) => sa.amount).toString(),
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
