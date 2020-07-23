import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format } from 'd3';

import { requestCurrentStateData } from '../../redux/actions/actions';

const Table = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
`;

const Row = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const Head = styled.thead``;

const Body = styled.tbody``;

const Th = styled.th`
  font-size: 0.8rem;
  font-weight: 400;
  text-align: right;
  vertical-align: bottom;
  color: #777;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Td = styled.td`
  vertical-align: center;
  text-align: right;
  font-size: 1rem;
  color: #111;
  text-transform: none;
  padding: 0.5rem 1rem;
`;

const State = styled(Td)`
  text-align: left;
  padding-left: 0;
`;

export function DataTable({ data, getCurrentData, meta }) {
  const formatNumber = format(',');
  useEffect(() => {
    getCurrentData();
  }, []);

  return (
    <Table>
      <Head>
        <Row>
          <Th style={{ textAlign: 'left', paddingLeft: '0' }}>State</Th>
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
            Tests <br />
            Administered
          </Th>
        </Row>
      </Head>
      <Body>
        {data && meta
          ? data.map((state) => (
              <Row key={state.hash}>
                <State>
                  {meta.find((current) => current.state === state.state).name}
                </State>
                <Td>{formatNumber(state.deaths)}</Td>
                <Td>{formatNumber(state.totalCases)}</Td>
                <Td>{formatNumber(state.tests)}</Td>
              </Row>
            ))
          : null}
      </Body>
    </Table>
  );
}

const mapStateToProps = (state) => ({
  data: state.currentData.data,
  meta: state.meta.meta,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentData: () => dispatch(requestCurrentStateData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
