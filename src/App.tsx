import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet';
import { Header } from './components/Header/Header';
import { TEXT } from './theme/theme';
import { useAccount, useConnect, useContract, useContractRead, useNetwork, useProvider, useSigner } from 'wagmi';
import PlanckCat from './assets/planck-cat.png';
import { ShellTerminal } from './components/ShellTerminal/ShellTerminal';
import { useWalletTokens } from './state/wallet/hooks';
import PlanckCatMinter_ABI from './constants/abis/PlanckCatMinter.json';
import { Claim } from './state/pages/Claim';
import { Home } from './state/pages/Home';
import { Inventory } from './state/pages/Inventory';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

function App() {

  return (
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact strict path="/" component={Home} />
        <Route exact strict path="/claim" component={Claim} />
        <Route exact strict path="/inventory" component={Inventory} />
      </Switch>
    </AppWrapper>
  );
}

export default App; 
