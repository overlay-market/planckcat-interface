import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { RouteComponentProps } from 'react-router'
import { useTokenAttributes } from "../../hooks/useTokenAttributes";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  max-width: 1000px;
`;

const TokenInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto auto 50px;
  height: auto;

  ${({ theme }) => theme.mediaWidth.minSmall`
    height: 500px;
    flex-direction: row;
  `}
`;

const TokenImage = styled.div<{backgroundImg?: string}>`
  height: 333px;
  width: 333px;
  color: white;
  text-align: center;
  background-image: url('${({backgroundImg}) => ( backgroundImg ?? backgroundImg)}');
  background-repeat: no-repeat;
  background-size: contain;

  ${({ theme }) => theme.mediaWidth.minSmall`
    height: 420px;
    width: 420px;
  `}
`;

const TokenAttributes = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  text-transform: lowercase;

  ${({ theme }) => theme.mediaWidth.minSmall`
    margin-left: 8px;
  `}
`;

const StyledRow = styled.tr`
  margin: 8px 0;

  ${({ theme }) => theme.mediaWidth.minSmall`
    margin: none;
  `}
`

export function Token(
  {match: { params: { tokenId }}
}: RouteComponentProps<{ tokenId: string }>){
  const tokenAttributes = useTokenAttributes(tokenId);

  return (
    <Wrapper>
      <TEXT.StandardBody m={'50px auto'}>
        Token #{tokenId} Attributes
      </TEXT.StandardBody>
      <TokenInfoContainer>
        <TokenImage backgroundImg={`https://planckcat.mypinata.cloud/ipfs/QmRoZLDujHb5ijQ1rg17EoxWCCA7yRiEUbJ4tPwejT71Hf/${tokenId}.png`} />

        <TokenAttributes>
            {tokenAttributes ? (
              tokenAttributes.map((attribute: any) => (
                <StyledRow>
                  <th>{attribute.trait_type}:</th>
                  <td>{attribute.value}</td>
                </StyledRow>
              ))
            ):(
              <TEXT.StandardBody>
                Fetching attributes...
              </TEXT.StandardBody>
            )}
        </TokenAttributes>
      </TokenInfoContainer>
    </Wrapper>
  )
};