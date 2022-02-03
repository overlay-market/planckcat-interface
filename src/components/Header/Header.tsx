import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { TEXT } from "../../theme/theme";

const Container = styled.div`
  display: block;
  width: 100%;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <TEXT.StandardBody>
          PlanckCatDAO
        </TEXT.StandardBody>
        <ConnectWalletModal />
      </FlexRowContainer>
    </Container>
  )
};