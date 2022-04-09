import { useSearchCompany } from "../utils/useSearchCompany";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatNumber } from "../utils/formatNumber";
import { parseHttpError } from "../utils/parseHttpError";
import { HttpErrorAlert } from "./HttpErrorAlert";
import * as _ from "lodash";

const Button = styled.button`
  border: 2px solid #000;
  color: #000;
  padding: 8px 25px;
  background: #fff;
  font-weight: 600;
  &:hover {
    background: #d6d6d6;
  }
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

export default function Company(): JSX.Element {
  const { symbol } = useParams<{ symbol: string }>();
  const { company, loading, error } = useSearchCompany(symbol);

  const showError = () => {
    return !_.isEmpty(error) || (!loading && !company.Name);
  };

  return (
    <div className="mx-2 mx-sm-5 mt-4">
      <Link to="/">
        <Button type="button">Go Back</Button>
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Name className="mt-4">{company.Name}</Name>
          <div className="my-2">
            <strong className="me-2">Address:</strong>
            {company.Address}
          </div>
          <div className="my-2">
            <strong className="me-2">Market capitalization:</strong>
            {formatNumber(company.MarketCapitalization)}
          </div>
          <div className="mt-4">{company.Description}</div>
        </div>
      )}
      {showError() && !loading && <HttpErrorAlert error={parseHttpError(error)} />}
    </div>
  );
}
