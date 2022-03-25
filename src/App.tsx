import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet';
import { Header } from './components/Header/Header';
import { TEXT } from './theme/theme';
import { useAccount, useConnect, useContract, useContractRead, useNetwork } from 'wagmi';
import PlanckCat from './assets/planck-cat.png';
import { ShellTerminal } from './components/ShellTerminal/ShellTerminal';
import { useWalletTokens } from './state/wallet/hooks';
import PlanckCatMinter_ABI from './constants/abis/PlanckCat.json';
import { Claim } from './state/pages/Claim';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

const ImgWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 200px;
`;

function App() {
  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();
  const tokens = useWalletTokens(accountData?.address)
  const [{ data: contractData }, read] = useContractRead(
    {
      addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
      contractInterface: PlanckCatMinter_ABI,
    },
    'canClaim',
    {
      args: '0x22c17332f5527703d34121704c036d713418c232'
    }
  )
  
  console.log('contractData:' , contractData);
  console.log('networkData ', networkData);
  console.log('tokens: ', tokens);

  return (
    <AppWrapper>
      <Header />
      <Body>
        { accountData ? (
          <TEXT.StandardBody m={'auto'}>
            hello
          </TEXT.StandardBody>
        ):(
          <>
            {/* <ImgWrapper>
              <img src={PlanckCat} />
            </ImgWrapper> */}
            <TEXT.StandardBody m={'auto'}>
              This wallet does not currently hold a PlanckCat.
            </TEXT.StandardBody>
            
            <ShellTerminal />
          </>
        )}
      </Body>
      <Switch>
        <Route exact strict path="/claim" component={Claim} />
      </Switch>
    </AppWrapper>
  );
}

export default App; 
