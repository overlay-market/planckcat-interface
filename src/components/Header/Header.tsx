import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";

const Container = styled.div`
  display: block;
  width: 100%;
`

export const Header = () => {
  return (
    <Container>
      Header
      <ConnectWalletModal />
    </Container>
  )
};