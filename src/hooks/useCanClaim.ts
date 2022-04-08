import { useMemo, useEffect, useState } from "react";
import { useSigner, useContract, useConnect, useNetwork } from "wagmi";
import PlanckCatMinter_ABI from "../constants/abis/PlanckCatMinter.json";
import { MINTER_ADDRESS } from "../constants/addresses";

export function useCanClaim(accountAddress?: string): any {
  const [
    { data: signerData, error: signerError, loading: signerLoading },
    getSigner,
  ] = useSigner();
  const [{ data: networkData }, switchNetwork] = useNetwork();

  const chainId: number | null = networkData?.chain?.id
    ? networkData.chain.id
    : null;

  //default to arbitrum chain if none detected
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
