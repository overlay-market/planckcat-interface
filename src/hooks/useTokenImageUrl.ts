import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenImageUrl(uri: string): any {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(uri)
        .then((response: any) => {
          const fetchedUrl = response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/")
          setImageUrl(fetchedUrl)
        })
    })();
  }, [uri]);

  return useMemo(() => {
    return imageUrl ? imageUrl : null;
  }, [imageUrl]);
};

export function useTokenImageUrls(uris: string[]): string[] {
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  return useMemo(() => {
    uris.forEach((uri) => {
      (async () => {
        await axios.get(uri)
          .then((response: any) => {
            const fetchedUrl = response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/")
            setImageUrls(imageUrl => [...imageUrls, fetchedUrl])
          })
      })();
    })

    return imageUrls ? imageUrls : []
  }, [imageUrls, uris]);
};