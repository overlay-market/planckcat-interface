
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { utils } from "ethers";
import { useContract, useSigner, useAccount, useContractWrite, useContractRead } from "wagmi";
import PlanckCatMinter_ABI from '../../constants/abis/PlanckCatMinter.json';
import { useCanClaim } from "../../hooks/useCanClaim";
import { useClaimCallback } from "../../hooks/useClaimCallback";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
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
  // const claimable = useCanClaim(accountData?.address ?? '');
  const claimable = useCanClaim("0xe64d330cc8654520815aa3ce90613d89b855e3a0");
  const { callback: claimCallback } = useClaimCallback(17);

  console.log('claimable: ', claimable);

  const handleClaim = useCallback(() => {
    if (!claimCallback) return;
    claimCallback()
      .then((response: any) => {
        console.log('handleClaim response: ', response);
      })
      .catch((error: any) => {
        console.error('handleClaim error: ', error);
      })
  }, [claimCallback])

  return (
    <Container>
      {claimable == null && (
        <TEXT.StandardBody m={'auto'}>
          Checking for claimable tokens...
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length === 0 && (
        <TEXT.StandardBody m={'auto'}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length > 0 && (
        <>
          <TEXT.StandardBody m={'auto auto 0 auto'}>
            You have {claimable.length} tokens available to claim.
          </TEXT.StandardBody>
          <ClaimButton onClick={handleClaim}>
            Claim
          </ClaimButton>
        </>
      )}
    </Container>
  )
}
