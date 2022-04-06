import { useMemo } from "react";
import styled from "styled-components"
import { useAccount } from "wagmi";
import { TEXT } from "../theme/theme";
import { useWalletTokens } from "../state/wallet/hooks";
import { StyledInternalLink } from "../theme/components";
import { useTokenUris } from "../hooks/useTokenURI";
import { useTokenImageUrls } from "../hooks/useTokenImageUrl";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
  padding: 0 28px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    max-width: 1000px;
    padding: 0 48px;
  `};
`;

const TokenCard = styled.div<{backgroundImg?: string}>`
  height: 200px;
  width: 200px;
  text-align: center;
  border: 1px solid white;
  color: white;
  background-image: url('${({backgroundImg}) => ( backgroundImg ?? backgroundImg)}');
  background-size: contain;
`;

export function Inventory() {
  const [{ data: accountData }] = useAccount();
  const { tokens } = useWalletTokens(accountData?.address);
  const memoizedTokens = useMemo(() => (tokens), [tokens]);

  console.log('memoizedTokens: ', memoizedTokens)
  const uris = useTokenUris(memoizedTokens);
  // const imageUrls = useTokenImageUrls(uris);

  console.log('tokens: ', tokens);
  console.log('uris: ', uris);

  // console.log('imageUrls: ', imageUrls);


  return (
    <Container>
      {accountData && tokens && (
        tokens.map((tokenId) => (  
          <StyledInternalLink to={`/token/${tokenId}`}>
            <TokenCard backgroundImg={`https://planckcat.mypinata.cloud/ipfs/QmRoZLDujHb5ijQ1rg17EoxWCCA7yRiEUbJ4tPwejT71Hf/${tokenId}.png`}>
              {tokenId}
            </TokenCard>
          </StyledInternalLink>
        ))
      )}
      {!tokens && (
        <TEXT.StandardBody m={'auto'} textAlign={'center'} lineHeight={'2rem'}>
          Wallet does not hold any tokens.
        </TEXT.StandardBody>
      )}
    </Container>
  )
}