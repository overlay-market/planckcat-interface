import { useState, useEffect } from "react";
import styled from 'styled-components';
import ThreeDots from 'react-loader-spinner';
import { useAccount, useConnect } from 'wagmi';
import { useActiveWeb3React } from '../../hooks/web3';
import { shortenAddress } from '../../utils/web3';
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWalletModalToggle, useModalOpen } from '../../state/application/hooks';
import { ApplicationModal } from '../../state/application/actions';
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import usePrevious from "../../hooks/usePrevious";

const ConnectWalletButton = styled.button`
  background: transparent;
  box-shadow: none;
  font-family: 'Press Start 2P';
  border: 1px solid #56CCF2;
  border-radius: 8px;
  color: #f2f2f2;
  padding: 12px;
  font-size: 12px;
  cursor: pointer;
`;

const Web3WalletDisplay = styled.div`
  background: #56CCF2;
  font-family: 'Press Start 2P';
  color: #f2f2f2;
  border: none;
  border-radius: 8px;
  box-shadow: none;
  font-size: 12px;
  padding: 12px;
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export const ConnectWallet = () => {
  const { account, connector, activate } = useActiveWeb3React();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const previousAccount = usePrevious(account);

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    // if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
    //   connector.walletConnectProvider = undefined
    // }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  };
  if (accountData) {
    return (
      // <div>
      //   <img src={accountData?.ens?.avatar ?? undefined} alt="ENS Avatar" />
      //   <div>
      //     {accountData.ens?.name
      //       ? `${accountData.ens?.name} (${accountData.address})`
      //       : accountData.address}
      //   </div>
      //   <div>Connected to {accountData?.connector?.name}</div>
      //   <button onClick={disconnect}>Disconnect</button>
      // </div>
      <Web3WalletDisplay>
        {shortenAddress(accountData.address)}
      </Web3WalletDisplay>
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