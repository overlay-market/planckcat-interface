import styled from "styled-components"
import { TEXT } from "../../theme/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

export function Inventory() {
  return (
    <Container>
      <TEXT.StandardBody m={'auto'}>
        Inventory Page
      </TEXT.StandardBody>
    </Container>
  )
}