import styled from 'styled-components';
import ThreeDots from 'react-loader-spinner';
import { useAccount, useConnect } from 'wagmi';
import { useWalletModalToggle, useModalOpen } from '../../state/application/hooks';
import { ApplicationModal } from '../../state/application/actions';

const ConnectWalletButton = styled.button`
  background: transparent;
  box-shadow: none;
  font-family: 'Press Start 2P';
  border: 1px solid #56CCF2;
  border-radius: 8px;
  color: #f2f2f2;
  padding: 16px 12px;
`;

export const ConnectWallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  if (accountData) {
    return (
      <div>
        <img src={accountData?.ens?.avatar ?? undefined} alt="ENS Avatar" />
        <div>
          {accountData.ens?.name
            ? `${accountData.ens?.name} (${accountData.address})`
            : accountData.address}
        </div>
        <div>Connected to {accountData?.connector?.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {walletModalOpen ? (
        <ConnectWalletButton>
          ...loading
        </ConnectWalletButton>
      ):(
        <ConnectWalletButton onClick={toggleWalletModal}>
          Connect Wallet
        </ConnectWalletButton>
      )}

      {/* {connectData.connectors.map((x) => (
        <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
          {x.name}
          {!x.ready && ' (unsupported)'}
        </button>
      ))}

      {connectError && <div>{connectError?.message ?? 'Failed to connect'}</div>} */}
    </div>
  )
}