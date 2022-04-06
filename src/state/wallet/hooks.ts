import { useMemo, useState, useEffect } from "react";
import { useAccountQuery } from '../data/enhanced';

export function useWalletTokens(
  address: string | null | undefined
) {
  const [tokens, setTokens] = useState<any[]>([])
  const queryAddress = address ? address.toLowerCase() : "";
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAccountQuery({ account: queryAddress })
  
  useEffect(() => {
    if (!data || data === null) return;

    data?.account?.tokens.forEach((token) => (
      setTokens(tokens => [...tokens, token.id])
    ))
  }, [address, data]);

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      tokens: tokens
    } 
  }, [isLoading, isError, error, isUninitialized, tokens])
};