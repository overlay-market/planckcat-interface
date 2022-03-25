import styled from "styled-components";
import { useAccount } from "wagmi";
import { TEXT } from "../../theme/theme";
import { ShellTerminal } from "../../components/ShellTerminal/ShellTerminal";

const ImgWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

export function Home(){
  const [{ data: accountData }] = useAccount();

  return (
    <Container>
      { accountData ? (
        <TEXT.StandardBody m={'auto'}>
          hello
        </TEXT.StandardBody>
      ):(
        <>
          {/* <ImgWrapper>
            <img src={PlanckCat} />
          </ImgWrapper> */}
          <TEXT.StandardBody m={'auto'}>
            This wallet does not currently hold a PlanckCat.
          </TEXT.StandardBody>
          
          <ShellTerminal />
        </>
      )}
    </Container>
  )
}