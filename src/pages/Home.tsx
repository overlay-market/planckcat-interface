import styled from "styled-components";
import { ShellTerminal } from "../components/ShellTerminal/ShellTerminal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

export function Home() {
  return (
    <Container>
      <ShellTerminal />
    </Container>
  );
}
