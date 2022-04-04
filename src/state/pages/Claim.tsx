
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { utils } from "ethers";
import { useContract, useSigner, useAccount, useContractWrite, useContractRead, useNetwork } from "wagmi";
import PlanckCatMinter_ABI from '../../constants/abis/PlanckCatMinter.json';
import { useCanClaim } from "../../hooks/useCanClaim";
import { useClaimCallback } from "../../hooks/useClaimCallback";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
  margin: 50px auto auto auto;
  flex: 1;
  padding: 0 48px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    max-width: 1000px;
  `};
`;

const ClaimButton = styled.button`
  background: #56CCF2; 
  border: 2px solid #56CCF2;
  border-radius: 8px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 200px;
  font-family: 'Press Start 2P';
  box-shadow: 0 0 5px #56ccf2;
  margin: 24px auto auto auto;
`;

export function Claim() {
  const [{ data: accountData }] = useAccount();
  const claimable = useCanClaim(accountData?.address ?? '');
  const { callback: claimCallback } = useClaimCallback(claimable ? claimable[0] : '');
  const [{ attemptingTransaction, transactionErrorMessage, transactionHash }, setClaimState] = useState<{
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: undefined,
  }>({
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  });

  console.log('claimable: ', claimable);

  const [{ data: networkData, error, loading }, switchNetwork] = useNetwork()
  console.log('networkData: ', networkData)

  const handleClaim = useCallback(() => {
    if (!claimCallback) return;
    setClaimState({
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined
    })
    claimCallback()
      .then((response: any) => {
        setClaimState({
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: response
        })
        console.log('handleClaim response: ', response);
      })
      .catch((error: any) => {
        setClaimState({
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined
        })
        console.error('handleClaim error: ', error);
      })
  }, [claimCallback])

  return (
    <Container>
      {claimable == null && (
        <TEXT.StandardBody m={'auto'} textAlign={'center'}>
          Checking for claimable tokens...
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length === 0 && (
        <TEXT.StandardBody m={'auto'} textAlign={'center'}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length > 0 && (
        <>
          <TEXT.StandardBody m={'auto auto 0 auto'} textAlign={'center'}>
            You have {claimable.length} tokens available to claim.
          </TEXT.StandardBody>
          {attemptingTransaction && (
            <ClaimButton>
              Claiming...
            </ClaimButton>
          )}
          {transactionHash !== undefined && (
            <ClaimButton>
              Claimed!
            </ClaimButton>
          )}
          {!attemptingTransaction && transactionHash === undefined && (
            <ClaimButton onClick={handleClaim}>
              Claim
            </ClaimButton>
          )}
        </>
      )}
    </Container>
  )
}
