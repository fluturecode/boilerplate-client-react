import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactElement } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { StyledTable } from './styles';
import { BaseTableItem, GenericTableProps } from './types';

const TableDetails = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
  font-size: 0.9rem;
  color: #666;

  text-align: right;
  p { 
    padding: 0; 
    margin: 0; 
  }

  button {
    margin-left: 0.5rem;
    color: #333;
  }

  .col-md-auto {
    display: flex;
    align-items: center;
  }

  select {
    width: initial;
    margin-right: 0.5rem;
  }

  .pagination {
    align-items: center;
    justify-content: end;
  }
`;

export const GenericTable = <TableItem extends BaseTableItem>({
  headers,
  items,
  onRowClick,
  customRenderers = [],
}: GenericTableProps<TableItem>): ReactElement => {
  return (
    <>
      <StyledTable responsive>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)}>{header.label} {header.label ? <FontAwesomeIcon icon={['fas', 'sort']} /> : null}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => {
              if (onRowClick)
                onRowClick(item)
              }
            }>
              {headers.map((header) => {
                const customRenderer = customRenderers.find((cr) => cr.key === header.key);
                return (
                  <td key={String(header.key)}>{customRenderer ? customRenderer.renderer(item) : item[header.key]}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <TableDetails>
        <Row>
          <Col md="auto">
            <Form.Select aria-label="Page Size" size='sm'>
              <option>10</option>
              <option>25</option>
              <option>100</option>
            </Form.Select>
            <p>Items per page</p>
          </Col>

          <Col className='d-flex pagination'>
            <p>1 - 10 of 100</p>
            <Button disabled variant="link"><FontAwesomeIcon icon={['fas', 'chevron-left']} /> </Button>
            <Button variant="link"><FontAwesomeIcon icon={['fas', 'chevron-right']} /></Button>
          </Col>
        </Row>
      </TableDetails>


      {!items.length && <div className='text-center'>No data</div>}
    </>
  );
};
