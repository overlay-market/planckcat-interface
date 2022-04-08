import { useMemo, useEffect, useState } from "react";
import { useSigner, useContract } from "wagmi";
import PlanckCatMinter_ABI from "../constants/abis/PlanckCatMinter.json";

export function useCanClaim(accountAddress?: string): any {
  const [{ data: signerData }] = useSigner();
  const contract = useContract({
    addressOrName: "0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a",
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData,
  });

  const [claimable, setClaimable] = useState(null);

  useEffect(() => {
    if (accountAddress === "" || !contract || !signerData) return;

    (async () => {
      await contract
        .canClaim(accountAddress)
        .then((response: any) => {
          let temp: any = [];
          response.map((token: any) => temp.push(token.toNumber()));
          setClaimable(temp);
        })
        .catch((error: any) => {
          console.error("error: ", error);
        });
    })();
  }, [contract, accountAddress, signerData]);

  return useMemo(() => {
    return claimable ? claimable : null;
  }, [claimable]);
}
