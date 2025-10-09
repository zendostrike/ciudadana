import { useEffect, useState } from "react";

export const useSubratings = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSubratings = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch("https://673d7b5b0118dbfe860764b7.mockapi.io/api/v1/sub-ratings");
        if (!response.ok) {
          throw new Error("Failed to fetch subratings");
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubratings();
  }, []);

  return { data, isLoading, isError };
};
