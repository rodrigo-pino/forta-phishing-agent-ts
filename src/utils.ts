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
