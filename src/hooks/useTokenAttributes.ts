import { useMemo, useEffect, useState } from "react";
import axios from "axios";

export function useTokenAttributes(uri: string): any {
  const [tokenAttributes, setTokenAttributes] = useState([]);
  const [tokenImageUrl, setTokenImageUrl] = useState("");

  useEffect(() => {
    (async () => {
      await axios.get(uri).then((response: any) => {
        let replacedWithPrefix = response.data.image.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        );
        setTokenImageUrl(replacedWithPrefix);
        setTokenAttributes(response.data.attributes);
      });
    })();
  }, [uri]);

  return useMemo(() => {
    return {
      tokenAttributes,
      tokenImageUrl,
    };
  }, [tokenAttributes, tokenImageUrl]);
}
