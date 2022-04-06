import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenAttributes(tokenId: string): any {
  const [attributes, setAttributes] = useState([]);
  
  useEffect(() => {
    (async () => {
      await axios.get(`https://planckcat.mypinata.cloud/ipfs/QmXiTKKMxuLwTxQQpLvQkxunwuuhXpKEwow3CuLXy7LttM/${tokenId}.json`)
        .then((response: any) => {
          setAttributes(response.data.attributes);
        })
    })();
  }, [tokenId]);

  return useMemo(() => {
    return attributes ? attributes : null;
  }, [attributes]);
}