import { useEffect, useState } from 'react';

export const useFetch = (url: string, options: RequestInit) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData().then(r => console.log(r));
  }, []);
  return { data, error, loading };

}