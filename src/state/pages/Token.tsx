import styled from "styled-components";
import { TEXT } from "../../theme/theme";
import { RouteComponentProps } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

export function Token(
  {match: { params: { tokenId }}
}: RouteComponentProps<{ tokenId: string }>){

  return (
    <Container>
      <TEXT.StandardBody m={'auto'}>
        {tokenId}
      </TEXT.StandardBody>
    </Container>
  )
};