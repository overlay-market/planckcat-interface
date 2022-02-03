import { useConnect } from 'wagmi'

export const ConnectWallet = () => {
  const [{ data, error }, connect] = useConnect()

  console.log('data: ', data);
  console.log('error: ', error);
  console.log('connect: ', connect);
  
  return (
    <div>
      {data.connectors.map((x) => (
        <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
          {x.name}
          {!x.ready && ' (unsupported)'}
        </button>
      ))}

      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </div>
  )
}