import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "../config";
import { CompanyType } from "../types/companyType";
import { ErrorType } from "../types/errorType";

export const useSearchCompany = (companySymbol?: string) => {
  const [company, setCompany] = useState<CompanyType>({} as CompanyType);
  const [error, setError] = useState<ErrorType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.alphavantage.co/query`, {
        params: { function: "OVERVIEW", symbol: companySymbol, apikey: API_KEY },
      })
      .then((response) => {
        setCompany(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return { company, loading, error };
};
