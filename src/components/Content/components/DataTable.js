import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format } from 'd3';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import PropTypes from 'prop-types';

import { requestCurrentStateData } from '../../../redux/actions/actions';

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
  vertical-align: bottom;
  color: #777;
  text-transform: uppercase;
  padding: 0.5rem 0;
  text-align: left;
  text-decoration: ${(props) => (props.sorted ? 'underline' : null)};

  &:not(:first-child) {
    padding-right: 1rem;
    text-align: right;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
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
  const [sortConfig, setSortConfig] = useState({
    key: 'deaths',
    direction: 'descending',
  });
  const [sortedData, setSortedData] = useState(null);

  const formatNumber = format(',');
  useEffect(() => {
    getCurrentData();
  }, []);

  useMemo(() => {
    if (!data) return;
    setSortedData(data);
    const sortData = [...data];
    if (sortConfig !== null) {
      sortData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(sortData);
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      {sortedData && meta ? (
        <Table>
          <Head>
            <Row>
              <Th>State</Th>
              <Th
                onClick={() => requestSort('deaths')}
                sorted={sortConfig.key === 'deaths'}
              >
                {sortConfig.key === 'deaths' &&
                  (sortConfig.direction === 'ascending' ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  ))}
                Total
                <br />
                Deaths
              </Th>
              <Th
                onClick={() => requestSort('totalCases')}
                sorted={sortConfig.key === 'totalCases'}
              >
                {sortConfig.key === 'totalCases' &&
                  (sortConfig.direction === 'ascending' ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  ))}
                Total
                <br />
                Cases
              </Th>
              <Th
                onClick={() => requestSort('tests')}
                sorted={sortConfig.key === 'tests'}
              >
                {sortConfig.key === 'tests' &&
                  (sortConfig.direction === 'ascending' ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  ))}
                Tests <br />
                Administered
              </Th>
            </Row>
          </Head>
          <Body>
            {sortedData.map((state) => (
              <Row key={state.hash}>
                <State>
                  {meta.find((current) => current.state === state.state).name}
                </State>
                <Td>{formatNumber(state.deaths)}</Td>
                <Td>{formatNumber(state.totalCases)}</Td>
                <Td>{formatNumber(state.tests)}</Td>
              </Row>
            ))}
          </Body>
        </Table>
      ) : null}
    </>
  );
}

DataTable.defaultProps = {
  data: [],
  meta: [],
};

DataTable.propTypes = {
  data: PropTypes.array,
  meta: PropTypes.array,
  getCurrentData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.currentData.data,
  meta: state.meta.meta,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentData: () => dispatch(requestCurrentStateData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
