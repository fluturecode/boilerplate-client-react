import { Card } from "react-bootstrap";
import styled from "styled-components";

export const FormCard = styled(Card)`
  background: white;
  border-radius: 6px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  & > div:first-of-type {
    flex: 1;

    h1 {
      font-weight: 500;
      font-size: 2.0rem;
      margin: 0;
      margin-bottom: 0.25rem;
    }

    a {
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
`;

export const TableCard = styled(Card)`
  background: white;
  background: white;
  border-radius: 6px;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  table tr > td:last-of-type {
    text-align: right;
  }
`;

export const NoContent = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  i, svg {
  color: #333;
  margin-bottom: 0.5rem;
  }
`;
