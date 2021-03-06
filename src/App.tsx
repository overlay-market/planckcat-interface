import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Claim } from "./pages/Claim";
import { Home } from "./pages/Home";
import { Inventory } from "./pages/Inventory";
import { Token } from "./pages/Token";

export const AppWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
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
        <Route exact strict path="/token/:tokenId" component={Token} />
      </Switch>
    </AppWrapper>
  );
}

export default App;
