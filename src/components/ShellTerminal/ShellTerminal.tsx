import styled from "styled-components";
import "./ShellTerminal.css";
import PlanckCat from "../../assets/planck-cat.png"
import { useAccount, useNetwork } from "wagmi";
// @ts-nocheck

export const ShellTerminal = () => {
  const [{ data: accountData }] = useAccount();
  const [{ data: networkData }] = useNetwork();

  // console.log('networkData: ', networkData);

  return (
    <div className="shell-wrap">
      <p className="shell-top-bar">/Users/PCD/Documents/interface/</p>
      <ul className="shell-body">
        <li>cd&nbsp;/Users/PCD/Documents/interface/pages/home/</li>
        <li>...initializing</li>
        <li>loaded in 4.2069 seconds.</li>
        <li>Status Check:</li>
        <li>- v1-core complete</li>
        <li>- smart contract audits in progress [50%]</li>
        <li>- launch imminent</li>
        <li>{'>>'}</li>
        <li>{'>>'}</li>
        <li>{'>>'}</li>

        { accountData && networkData ? (
          <>
            <li>Welcome user {accountData.address} </li>
            <li>Connected Network: {networkData?.chain?.name}</li>
          </>
        ):(
          <li>Welcome Anonymous User! Please connect wallet.</li>
        )}
      </ul>
    </div>
  );
};
