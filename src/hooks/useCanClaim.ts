import { useMemo, useEffect, useState } from 'react';
import { BigNumber, BigNumberish, Bytes, BytesLike } from 'ethers';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';

export function useCanClaim(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const contract = useContract({
    addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData
  });
  const [claimable, setClaimable] = useState(null);

  useEffect(() => {
    if (accountAddress === '' || !contract || !signerData) return;

    (async () => {
      await contract.canClaim(accountAddress)
                    .then((response: any) => {
                      let temp: any = [];
                      response.map((token: any) => temp.push(token.toNumber()))
                      setClaimable(temp);
                    })  
    })();
  }, [contract, accountAddress, signerData]);

  return useMemo(() => {
    return claimable ? claimable : null;
  }, [claimable])
};