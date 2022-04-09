import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "../config";
import { StockType } from "../types/stockType";
import { ErrorType } from "../types/errorType";

export const useSearchStock = (query: string) => {
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [error, setError] = useState<ErrorType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`https://www.alphavantage.co/query`, {
          params: { function: "SYMBOL_SEARCH", keywords: query, apikey: API_KEY },
        })
        .then((response) => {
          setStocks(response.data.bestMatches);
          setLoading(false);
        })
        .catch((error) => setError(error));
    }
    if (!query) {
      setStocks([]);
    }
  }, [query]);

  return { stocks, loading, error };
};
