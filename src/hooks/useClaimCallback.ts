import { useMemo, useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';
import { useSigner, useContract, useBlockNumber, useAccount } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';

export function useClaimCallback(tokenId?: BigNumberish): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const [{ data: accountData }] = useAccount();
  const contract = useContract({
    addressOrName: '0x9ba2D3D2ED1a70ab7826978329DC04C6B1fbc888',
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData
  });

  return useMemo(() => {
    return {
      callback: async function onClaim(): Promise<any> {
        if (tokenId === '' || !contract || !signerData) return;

        return await contract
                .claim(tokenId)
                .then((response: any) => {
                  console.log('useClaimCallback response: ', response);
                  return response.hash;
                })
                .catch((error: any) => {
                  console.error('useClaimCallback error:' , error);
                })
      }
    }
    // return contract;
  }, [tokenId, contract, signerData])
};