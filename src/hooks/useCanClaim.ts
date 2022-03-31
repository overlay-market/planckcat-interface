import { useMemo, useEffect, useState } from 'react';
import { BigNumber, BigNumberish, Bytes, BytesLike } from 'ethers';
import { useSigner, useContract, useConnect } from 'wagmi';
import PlanckCatMinter_ABI from '../constants/abis/PlanckCatMinter.json';
import { MINTER_ADDRESS } from '../constants/addresses';

export function useCanClaim(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const [{ data: connectData, error, loading }, connect] = useConnect();
  const contract = useContract({
    addressOrName: '0x9ba2D3D2ED1a70ab7826978329DC04C6B1fbc888',
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