import { useMemo } from "react";
import { useAccountQuery } from '../data/enhanced';

export function useWalletTokens(
  address: string | null | undefined
) {
  let queryAddress = address ? address.toLowerCase() : "";

  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAccountQuery({ account: queryAddress })
  
  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      tokens: data?.account?.tokens
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};