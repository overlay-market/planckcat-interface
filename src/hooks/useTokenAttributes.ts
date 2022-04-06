import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenAttributes(uri: string): any {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    (async () => {
      await axios.get(uri)
        .then((response: any) => {
          console.log('response from useTokenAttributes: ', response);
          setAttributes(response.data.attributes);
        })
    })();
  }, [uri]);

  return useMemo(() => {
    return attributes ? attributes : null;
  }, [attributes]);
}