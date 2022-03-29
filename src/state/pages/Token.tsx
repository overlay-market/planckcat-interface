import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { RouteComponentProps } from 'react-router'
import axios from "axios";
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
`;

const ImageCard = styled.div<{backgroundImg?: string}>`
  height: 300px;
  width: 300px;
  text-align: center;
  color: white;
  background-image: url('${({backgroundImg}) => ( backgroundImg ?? backgroundImg)}');
  background-size: contain;
`;

const Attributes = styled.div`
  display: flex;
  flex-direction: column;
`;

const AttributeContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export function Token(
  {match: { params: { tokenId }}
}: RouteComponentProps<{ tokenId: string }>){
  const tokenAttributes = useTokenAttributes(tokenId);

  console.log('tokenAttributes: ', tokenAttributes);
  return (
    <Wrapper>
      <TEXT.StandardBody m={'50px auto'}>
        Token #{tokenId}
      </TEXT.StandardBody>
      <Container>
        <ImageCard backgroundImg={`https://planckcat.mypinata.cloud/ipfs/QmRoZLDujHb5ijQ1rg17EoxWCCA7yRiEUbJ4tPwejT71Hf/${tokenId}.png`} />

        <Attributes>
            {tokenAttributes ? (
              tokenAttributes.map((attribute: any) => (
                <AttributeContainer>
                  <TEXT.StandardBody>
                    {attribute.trait_type}
                  </TEXT.StandardBody>
                  <TEXT.StandardBody>
                    {attribute.value}
                  </TEXT.StandardBody>
                </AttributeContainer>
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