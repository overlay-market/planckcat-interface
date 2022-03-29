import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { RouteComponentProps } from 'react-router'
import { useTokenAttributes } from "../../hooks/useTokenAttributes";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 24px auto auto auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 500px;
  flex: 1;
  margin: auto;
`;

const ImageContainer = styled.div`
  width: 50%;
`;

const Image = styled.div<{backgroundImg?: string}>`
  height: 300px;
  width: 300px;
  text-align: center;
  color: white;
  background-image: url('${({backgroundImg}) => ( backgroundImg ?? backgroundImg)}');
  background-size: contain;
`;

const Attributes = styled.table`
  display: flex;
  flex-direction: column;
  color: white;
  text-transform: lowercase;
  justify-content: space-between;
  margin-left: 8px;
  width: 50%;
`;

export function Token(
  {match: { params: { tokenId }}
}: RouteComponentProps<{ tokenId: string }>){
  const tokenAttributes = useTokenAttributes(tokenId);

  return (
    <Wrapper>
      <TEXT.StandardBody m={'50px auto'}>
        Token #{tokenId} Attributes
      </TEXT.StandardBody>
      <Container>
        <ImageContainer>
          <Image backgroundImg={`https://planckcat.mypinata.cloud/ipfs/QmRoZLDujHb5ijQ1rg17EoxWCCA7yRiEUbJ4tPwejT71Hf/${tokenId}.png`} />
        </ImageContainer>

        <Attributes>
            {tokenAttributes ? (
              tokenAttributes.map((attribute: any) => (
                <tr>
                  <th>{attribute.trait_type}:</th>
                  <td>{attribute.value}</td>
                </tr>
              ))
            ):(
              <TEXT.StandardBody>
                Fetching attributes...
              </TEXT.StandardBody>
            )}
        </Attributes>
      </Container>
    </Wrapper>
  )
};