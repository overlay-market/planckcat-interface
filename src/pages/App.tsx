import React from 'react';
import styled from 'styled-components';
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet';
import { Header } from '../components/Header/Header';

const Wrapper = styled.div`
  height: 100%;
`

function App() {
  return (
    <Wrapper>
      <Header />
      <ConnectWallet />
    </Wrapper>
  );
}

export default App; 
