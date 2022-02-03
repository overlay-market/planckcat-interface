import { useAccount, useConnect } from 'wagmi';
import { useWalletModalToggle } from '../../state/application/hooks';

export const ConnectWallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

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
      <button onClick={toggleWalletModal}>
        Connect Wallet
      </button>
      {connectData.connectors.map((x) => (
        <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
          {x.name}
          {!x.ready && ' (unsupported)'}
        </button>
      ))}

      {connectError && <div>{connectError?.message ?? 'Failed to connect'}</div>}
    </div>
  )
}