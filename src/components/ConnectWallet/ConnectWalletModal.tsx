import { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function ConnectWalletModal() {
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  return (
    <>
    </>
  );
}