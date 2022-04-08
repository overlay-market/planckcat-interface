import styled from "styled-components";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils/web3";
import {
  useWalletModalToggle,
  useModalOpen,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";

const ConnectWalletButton = styled.button`
  background: transparent;
  box-shadow: none;
  font-family: "Press Start 2P";
  border: 2px solid #56ccf2;
  border-radius: 8px;
  color: #f2f2f2;
  padding: 12px;
  font-size: 12px;
  cursor: pointer;
`;

const Web3WalletDisplay = styled.div`
  background: #56ccf2;
  font-family: "Press Start 2P";
  color: #f2f2f2;
  border: none;
  border-radius: 8px;
  box-shadow: none;
  font-size: 12px;
  padding: 12px;
`;

export const ConnectWallet = () => {
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();

  if (accountData) {
    return (
      <>
        <Web3WalletDisplay>
          {/* [{networkData.chain?.name}] */}
          {shortenAddress(accountData.address)}
        </Web3WalletDisplay>
      </>
    );
  }

  return (
    <div>
      {walletModalOpen ? (
        <ConnectWalletButton>...loading</ConnectWalletButton>
      ) : (
        <ConnectWalletButton onClick={toggleWalletModal}>
          Connect Wallet
        </ConnectWalletButton>
      )}
    </div>
  );
};
