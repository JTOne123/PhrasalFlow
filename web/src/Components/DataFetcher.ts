import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface DataFetcherProps {
  query: string;
  onSuccess: (data: any) => void; // Replace 'any' with your actual data type
  onError: () => void;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ query, onSuccess, onError }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(`https://phrasalverbs.printslon.com/data/uk.json`, {
          params: { query },
        });
        onSuccess(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        onError();
      }
    };

    fetchData();
  }, [query, onSuccess, onError]);

  // You can also render a loading indicator here if needed
  return null;
};

export default DataFetcher;