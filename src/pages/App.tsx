import React from 'react';
import styled from 'styled-components';
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet';
import { Header } from '../components/Header/Header';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

function App() {
  return (
    <AppWrapper>
      <Header />
      <ConnectWallet />
    </AppWrapper>
  );
}

export default App; 
