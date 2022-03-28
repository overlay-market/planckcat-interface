
import { useState, useEffect } from "react";
import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { useContract, useSigner, useAccount } from "wagmi";
import PlanckCatMinter_ABI from '../../constants/abis/PlanckCatMinter.json';
import { useCanClaim } from "../../hooks/useCanClaim";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

export function Claim() {
  const [{ data: accountData }] = useAccount();
  const claimable = useCanClaim(accountData?.address);

  return (
    <Container>
      {claimable == null && (
        <TEXT.StandardBody m={'auto'}>
          Checking for claimable tokens...
        </TEXT.StandardBody>
      )}
      {claimable.length == 0 && (
        <TEXT.StandardBody m={'auto'}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
    </Container>
  )
}
