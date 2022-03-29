import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { RouteComponentProps } from 'react-router'
import axios from "axios";
import { useTokenAttributes } from "../../hooks/useTokenAttributes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-width: 1000px;
  margin: 50px auto auto auto;
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


export function Token(
  {match: { params: { tokenId }}
}: RouteComponentProps<{ tokenId: string }>){
  const tokenAttributes = useTokenAttributes(tokenId);

  console.log('tokenAttributes: ', tokenAttributes);
  return (
    <Container>
      <TEXT.StandardBody m={'50px auto'}>
        Token #{tokenId}
      </TEXT.StandardBody>
      <ImageCard backgroundImg={`https://planckcat.mypinata.cloud/ipfs/QmRoZLDujHb5ijQ1rg17EoxWCCA7yRiEUbJ4tPwejT71Hf/${tokenId}.png`} />

      {tokenAttributes ? (
        <>
        </>
      ):(
        <TEXT.StandardBody>
          Fetching attributes...
        </TEXT.StandardBody>
      )}
    </Container>
  )
};