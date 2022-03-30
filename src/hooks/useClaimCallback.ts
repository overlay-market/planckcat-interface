import { useMemo, useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';

export function useClaimCallback(tokenId?: BigNumberish, accountAddress?: BigNumberish): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const contract = useContract({
    addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData
  });

  return useMemo(() => {
    if (tokenId === '' || accountAddress === '' || !contract || !signerData) return;
    return {
      callback: async function onClaim(): Promise<string> {
        return contract
                .claim(tokenId)
                .then((response: any) => {
                  console.log('useClaimCallback response: ', response);
                  return response;
                })
                .catch((error: any) => {
                  console.error('useClaimCallback error:' , error);
                })

      }
    }
  }, [tokenId, accountAddress, contract, signerData])
};