import styled from "styled-components"
import { TEXT } from "../../theme/theme";
import { useWalletTokens } from "../wallet/hooks";
import { useAccount } from "wagmi";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 500px;
  max-width: 1000px;
  margin: 50px auto auto auto;
  flex: 1;
`;

const TokenCard = styled.div`
  height: 200px;
  width: 200px;
  text-align: center;
  border: 1px solid white;
  color: white;
`;

export function Inventory() {
  const [{ data: accountData }] = useAccount();
  const { tokens } = useWalletTokens(accountData?.address);

  console.log('tokens: ' , tokens);
  return (
    <Container>
      {accountData && tokens && (
        tokens.map((token) => (  
          <TokenCard>
            {token.id}
          </TokenCard>
        ))
      )}
      {!tokens && (
        <TEXT.StandardBody m={'auto'}>
          Wallet does not hold any tokens.
        </TEXT.StandardBody>
      )}
    </Container>
  )
}