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

const MenuLink = styled(NavigationLink)`
  font-size: 12px;
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <NavigationLink to={'/'} noEffect={true}>
          PlanckCatDAO
        </NavigationLink>

        <MenuLink to={'/Claim'}>
          Claim
        </MenuLink>

        <MenuLink to={'/Inventory'}>
          Inventory
        </MenuLink>
        <ConnectWallet />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  )
};
