import { useMemo, useEffect, useState } from 'react';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';

export function useCanClaim(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const [{ data: blockData, error: blockError, loading: blockLoading }, getBlockNumber] = useBlockNumber()
  const contract = useContract({
    addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
    contractInterface: PlanckCatMinter_ABI,
    signerOrProvider: signerData
  });
  const [claimable, setClaimable] = useState([]);

  useEffect(() => {
    if (!contract || !signerData) return;

    (async () => {
      setClaimable(await contract.canClaim(accountAddress))
    })();
  }, [contract, accountAddress, signerData]);

  return useMemo(() => {
    return claimable ? claimable : null;
  }, [claimable])
};