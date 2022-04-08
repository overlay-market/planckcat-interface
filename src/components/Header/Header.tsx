import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { StyledInternalLink } from "../../theme/components";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { enableLock, disableLock } from "../../utils/scrollLock";
import Burger from "../Burger/Burger";
import SlideMenu from "../SlideMenu/SlideMenu";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";

const HeaderContainer = styled.div`
  display: block;
  width: 100%;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 28px;
  max-width: 1000px;
  margin: auto;

  ${({ theme }) => theme.mediaWidth.minSmall`
    padding: 48px;
  `};
`;

const DesktopNavigationContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.minSmall`
    display: flex;
  `};
`;

const NavigationLink = styled(StyledInternalLink)`
  margin-top: auto;
  margin-bottom: auto;
`;

const MenuLink = styled(NavigationLink)`
  font-size: 12px;
`;

const activeClassName = "ACTIVE";

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 12px;
  font-weight: 500;
  padding: 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 60px;
  &.${activeClassName} {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;
  const menuId = "main-menu";

  // close menu when at new route
  useEffect(() => {
    if (open) {
      setOpen((open) => false);
    }
  }, [location]);

  // disable scroll when mobile menu open
  useEffect(() => {
    if (open) {
      enableLock();
    } else {
      disableLock();
    }
  }, [open]);

  return (
    <HeaderContainer>
      <FlexRowContainer>
        <NavigationLink to={"/"} noEffect={true}>
          PlanckCatDAO
        </NavigationLink>

        <DesktopNavigationContainer>
          <StyledNavLink to={"/Claim"}>Claim</StyledNavLink>

          <StyledNavLink to={"/Inventory"}>Inventory</StyledNavLink>
          <ConnectWallet />
        </DesktopNavigationContainer>

        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
        <SlideMenu open={open} />
      </FlexRowContainer>
      <ConnectWalletModal />
    </HeaderContainer>
  );
};
