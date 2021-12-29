import { BigNumber } from "ethers";
import { Finding, FindingSeverity, FindingType } from "forta-agent";

export const phishingAlert = () =>
  Finding.fromObject({
    alertId: "SOME-ID",
    name: "Some Name",
    description: "Some description",
    severity: FindingSeverity.High,
    type: FindingType.Exploit,
    metadata: {
      smth: "smth",
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
