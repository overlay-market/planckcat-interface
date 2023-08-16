import { useMemo, useEffect, useState } from "react";
import { useSigner, useContract } from "wagmi";
import PlanckCat_ABI from "../constants/abis/PlanckCat.json";

export function useTokenUriString(tokenId?: string | number): any {
  const [{ data: signerData }] = useSigner();

  //default to arbitrum chain if none detected
  const contract = useContract({
    addressOrName: "0xc9B28946144E3A0e02fcC119a622E30565916784",
    contractInterface: PlanckCat_ABI,
    signerOrProvider: signerData,
  });

  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenId || !contract || !signerData) return;

    (async () => {
      await contract.tokenURI(tokenId).then((response: string) => {
        let prepend = response.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        );
        setUri(prepend);
      });
    })();
  }, [contract, tokenId, signerData]);

  return useMemo(() => {
    return uri ? uri : null;
  }, [uri]);
}
