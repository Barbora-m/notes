import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

import { client } from "../client";

export const useFetch = <ResponseType extends unknown>(
  options: AxiosRequestConfig
) => {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await client.request<ResponseType>(options);
        setResponse(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    void fetchData();

    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, isLoading };
};
