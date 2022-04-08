import { useState, useCallback } from "react";
import styled from "styled-components";
import { TEXT } from "../theme/theme";
import { useCanClaim } from "../hooks/useCanClaim";
import { useClaimCallback } from "../hooks/useClaimCallback";
import { useAccount, useNetwork } from "wagmi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
  margin: 50px auto auto auto;
  flex: 1;
  padding: 0 48px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    max-width: 1000px;
  `};
`;

const ClaimButton = styled.button`
  background: #56ccf2;
  border: 2px solid #56ccf2;
  border-radius: 8px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 200px;
  font-family: "Press Start 2P";
  box-shadow: 0 0 5px #56ccf2;
  margin: 24px auto auto auto;
`;

export function Claim() {
  const [{ data: accountData }] = useAccount();
  const claimable = useCanClaim(accountData?.address ?? "");
  const { callback: claimCallback } = useClaimCallback(
    claimable ? claimable[0] : ""
  );
  const [
    { attemptingTransaction, transactionErrorMessage, transactionHash },
    setClaimState,
  ] = useState<{
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: undefined;
  }>({
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  });

  const [{ data: networkData, error, loading }, switchNetwork] = useNetwork();

  const handleClaim = useCallback(() => {
    if (!claimCallback) return;
    setClaimState({
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    claimCallback()
      .then((response: any) => {
        setClaimState({
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: response,
        });
      })
      .catch((error: any) => {
        setClaimState({
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [claimCallback]);

  return (
    <Container>
      {claimable == null && (
        <TEXT.StandardBody m={"auto"} textAlign={"center"} lineHeight={"2rem"}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length === 0 && (
        <TEXT.StandardBody m={"auto"} textAlign={"center"} lineHeight={"2rem"}>
          You have no claimable tokens currently.
        </TEXT.StandardBody>
      )}
      {claimable && claimable.length > 0 && (
        <>
          <TEXT.StandardBody
            m={"auto auto 0 auto"}
            textAlign={"center"}
            lineHeight={"2rem"}
          >
            You have {claimable.length} tokens available to claim.
          </TEXT.StandardBody>
          {attemptingTransaction && <ClaimButton>Claiming...</ClaimButton>}
          {transactionHash !== undefined && <ClaimButton>Claimed!</ClaimButton>}
          {!attemptingTransaction && transactionHash === undefined && (
            <ClaimButton onClick={handleClaim}>Claim</ClaimButton>
          )}
        </>
      )}
    </Container>
  );
}
