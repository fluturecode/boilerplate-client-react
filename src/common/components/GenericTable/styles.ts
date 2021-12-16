import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

export const StyledTable = styled(Table)`
  border: none;
  margin: 0;
  
  thead {
    color: #666;
    
    th {
      border: none;
      font-weight: 500;
      font-size: 0.825rem;
      padding: 0.75rem 0.5rem;
  
      i, svg {
        color: #999;
        margin-left: 0.6rem;
      }
    }
  }


  tbody > tr {
    cursor: pointer;

    svg {
      color: #666;
    }
    
    td {
      border: 0;
      padding: 0.5rem;
      vertical-align:middle;
    }

    .dropdown button.btn.btn-primary {
      background: none;
      border: none;
      padding: 0.25rem 0.5rem;

      &:after {
        content: none;
      }
    }

    &:hover {
      & > td {
        background: #efefef;
        &:first-of-type {
          border-radius: 6px 0px 0px 6px;
        }
      
        &:last-of-type {
          border-radius: 0px 6px 6px 0px;
        }
      }
    }

    
  }

`;