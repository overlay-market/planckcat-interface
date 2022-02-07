import { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import { TEXT } from "../../theme/theme";
import { useConnect, useAccount } from "wagmi";
import Modal from "../Modal/Modal";
import MetaMaskLogo from "../../assets/metamask-icon.png";

const IconWrapper = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
`

const ProviderSelectionButton = styled.button`
  display: flex;
  background: transparent; 
  border: 1px solid #56CCF2;
  border-radius: 8px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 100%;
  font-family: 'Press Start 2P';
  margin-top: 12px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    :hover, :active {
      background: #56CCF2;
    }
  `}
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`;

const SelectionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function ConnectWalletModal() {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  useEffect(() => {
    if (accountData && walletModalOpen) {
      toggleWalletModal()
    }
  }, [walletModalOpen, accountData, toggleWalletModal])

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <ModalContentContainer>
        <TEXT.SmallBody>
          Connect to a wallet
        </TEXT.SmallBody>

        {connectData.connectors.map((x) => (
          <ProviderSelectionButton 
            disabled={!x.ready} 
            key={x.id} 
            onClick={() => connect(x)}
          >
            <SelectionContentContainer>
            <IconWrapper>
              <img src={MetaMaskLogo} />
            </IconWrapper>
            <TEXT.SmallBody m={"0 12px"}>
              {x.name}
              {!x.ready && ' (unsupported)'}
            </TEXT.SmallBody>
            </SelectionContentContainer>
          </ProviderSelectionButton>
        ))}
      </ModalContentContainer>
    </Modal>
  );
}