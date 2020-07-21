import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
`;

const Row = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const Th = styled.th`
  font-size: 0.8rem;
  font-weight: 400;
  text-align: right;
  vertical-align: bottom;
  color: #777;
  text-transform: uppercase;

  &:not(:first-child) {
    padding: 0.5rem 1rem;
  }
`;

const Td = styled(Th)`
  font-size: 1rem;
  color: #111;
  text-transform: none;
`;

const State = styled(Td)`
  text-align: left;
  padding: 0.5rem 0;
  padding-right: 3rem;
`;

const Header = styled.thead`
  font-size: 1.2rem;
`;

export default function DataTable() {
  return (
    <Table>
      <Header>
        <Row>
          <Th>&nbsp;</Th>
          <Th>
            Total
            <br />
            Deaths
          </Th>
          <Th>
            Total
            <br />
            Cases
          </Th>
          <Th>
            Cases <br />
            in Last
            <br />7 Days
          </Th>
        </Row>
      </Header>
      <Row>
        <State>Massachusetts</State>
        <Td>324,123</Td>
        <Td>3,211</Td>
        <Td>653</Td>
      </Row>
    </Table>
  );
}
