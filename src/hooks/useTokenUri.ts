import { useMemo, useEffect, useState } from 'react';
import { useSigner, useContract } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';

export function useTokenUri(tokenId?: string | number): any {
  const [{ data: signerData }] = useSigner();
  
  //default to arbitrum chain if none detected
  const contract = useContract({
    addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData
  });

  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    if (tokenId === '' || !tokenId || !contract || !signerData) return;

    (async () => {
      await contract.tokenURI(tokenId)
                    .then((response: string) => {
                      setUri(response);
                    }) 
    })();
  }, [contract, tokenId, signerData]);

  return useMemo(() => {
    return uri ? uri : null;
  }, [uri])
};