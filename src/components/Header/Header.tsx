import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { TEXT } from "../../theme/theme";

const Container = styled.div`
  display: block;
  width: 100%;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 32px;
  max-width: 1000px;
  margin: auto;
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <TEXT.StandardBody m={'auto 0'}>
          PlanckCatDAO
        </TEXT.StandardBody>

        <ConnectWallet />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  )
};