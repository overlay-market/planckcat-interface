import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenImageUrl(uri: string): any {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(uri)
        .then((response: any) => {
          const fetchedUrl = response.data.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
          setImageUrl(fetchedUrl)
        })
    })();
  }, [uri]);

  return useMemo(() => {
    return imageUrl ? imageUrl : null;
  }, [imageUrl]);
};
