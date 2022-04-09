import styled from "styled-components";

const HeaderDiv = styled.div`
  padding: 10px;
  color: #000;
  font-weight: 700;
  font-size: 22px;
  border-bottom: 2px solid #000;
`;

export default function Header(): JSX.Element {
  return <HeaderDiv>SDH Frontend Homework</HeaderDiv>;
}
