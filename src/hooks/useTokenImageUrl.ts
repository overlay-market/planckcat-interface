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

export async function useTokenImageUrls(uris?: string[]){
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  console.log('made it in here 1');
  if (!uris) return;
  console.log('made it in here 2');
  if (uris.length > 0) {
    console.log('made it in here 3');
    await uris.forEach((uri, key) => {
        (async () => {
          let parsed = await axios.get(uri)
                                .then(response => (
                                  response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/")
                                ))
          const currentLength = imageUrls.length;
          if (imageUrls[currentLength - 1] == parsed) return;
          setImageUrls(imageUrls => [...imageUrls, parsed]);
        })()
    })
  }

  return imageUrls;
  // const memorized = useMemo(() => {
  //   console.log('updatnig uris');
  //   return uris
  // }, [uris])

    // uris.forEach((uri, key) => {
    //     (async () => {
    //       await axios.get(uri)
    //         .then((response: any) => {
    //           console.log('response: ', response);
    //           let shallowCopy = imageUrls;
    //           let fetchedUrl = response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/")
    //           setImageUrls(imageUrls => [fetchedUrl])
    //         })
    //     })();
    // })


  // const requests = uris.map((uri) => fetch(uri));
  // const responses = await Promise.all(requests);
  // const promises = responses.map((response) => response.json());
  // return await Promise.all(promises);

  // const urls: string[] = await Promise.all(uris.map(async (uri): Promise<string> => {
  //   let fetchedUrl: string;

  //   await axios.get(uri)
  //     .then((response: any) => {
  //       console.log('response: ', response);
  //       fetchedUrl = response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/");
  //     })
  //     return fetchedUrl;
  //   }));

  // return fetchedUrls;

  // useEffect(() => {
  //   console.log('got hit');
  //   if (memorized.length > 0) console.log('bigger than 0');
  // }, [memorized])

  // return memorized;
  // const memoized = useMemo(() => {
  //   let tempUrls: any = [];
  //   uris.forEach((uri) => {
  //     (async () => {
  //       await axios.get(uri)
  //         .then((response: any) => {
  //           let fetchedUrl = response.data.image.replace("ipfs://", "https://planckcat.mypinata.cloud/ipfs/")
  //           console.log('fetchedUrl: ', fetchedUrl)
  //           // setImageUrls(imageUrl => [...imageUrls, fetchedUrl])
  //           // tempUrls[key] = fetchedUrl;
  //           console.log('tempUrls: ', tempUrls);
  //         })
  //     })();
  //   })

  //   console.log('tempUrls: ', tempUrls);
  //   return tempUrls;
  // }, [uris]);

  // return useMemo(() => {
  //   return memoized
  // }, [memoized]);


};