import styled from "styled-components";
import "./ShellTerminal.css";
import PlanckCat from "../../assets/planck-cat.png"
// @ts-nocheck

export const ShellTerminal = () => {
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
        <li>Welcome to PlanckCats.lol</li>
      </ul>
    </div>
  );
};
