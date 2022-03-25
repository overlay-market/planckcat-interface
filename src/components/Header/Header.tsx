import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { TEXT } from "../../theme/theme";
import { StyledInternalLink } from "../../theme/components";

const Container = styled.div`
  display: block;
  width: 100%;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 48px;
  max-width: 1000px;
  margin: auto;
`

const NavigationLink = styled(StyledInternalLink)`
  margin-top: auto;
  margin-bottom: auto;
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <NavigationLink to={'/'} noEffect={true}>
          PlanckCatDAO
        </NavigationLink>

        <NavigationLink to={'/Claim'}>
          Claim
        </NavigationLink>

        <NavigationLink to={'/Claim'}>
          Inventory
        </NavigationLink>
        <ConnectWallet />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  )
};
