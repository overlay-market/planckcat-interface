import styled from "styled-components";
import { useAccount } from "wagmi";
import { TEXT } from "../theme/theme";
import { useWalletTokens } from "../state/wallet/hooks";
import { StyledInternalLink } from "../theme/components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 420px;
  margin: 50px auto auto auto;
  flex: 1;
  padding: 0 28px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    max-width: 1000px;
    padding: 0 48px;
  `};
`;

const TokenCard = styled.div<{ backgroundImg?: string }>`
  padding: 100px;
  max-height: 200px;
  max-width: 200px;
  text-align: center;
  border: 1px solid white;
  color: white;
  background-image: url("${({ backgroundImg }) =>
    backgroundImg ?? backgroundImg}");
  background-size: contain;
`;

export function Inventory() {
  const [{ data: accountData }] = useAccount();
  const { tokens } = useWalletTokens(accountData ? accountData?.address : "");

  return (
    <Container>
      {accountData &&
        tokens &&
        tokens.map((token, key) => (
          <StyledInternalLink to={`/token/${token.id}`}>
            <TokenCard>{token.id}</TokenCard>
          </StyledInternalLink>
        ))}
      {!tokens && (
        <TEXT.StandardBody m={"auto"} textAlign={"center"} lineHeight={"2rem"}>
          Wallet does not hold any tokens.
        </TEXT.StandardBody>
      )}
    </Container>
  );
}
