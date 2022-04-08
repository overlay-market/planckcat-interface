import { useMemo } from "react";
import { BigNumberish } from "ethers";
import { useSigner, useContract } from "wagmi";
import PlanckCatMinter_ABI from "../constants/abis/PlanckCatMinter.json";

export function useClaimCallback(tokenId?: BigNumberish): any {
  const [{ data: signerData }] = useSigner();
  const contract = useContract({
    addressOrName: "0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a",
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData,
  });

  return useMemo(() => {
    return {
      callback: async function onClaim(): Promise<any> {
        if (tokenId === "" || !contract || !signerData) return;

        return await contract
          .claim(tokenId)
          .then((response: any) => {
            return response.hash;
          })
          .catch((error: any) => {
            console.error("error: ", error);
          });
      },
    };
    // return contract;
  }, [tokenId, contract, signerData]);
}
