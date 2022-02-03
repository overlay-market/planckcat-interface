import { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../Modal/Modal";

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`
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
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <ModalContentContainer>
        Connect to a wallet
      </ModalContentContainer>
    </Modal>
  );
}