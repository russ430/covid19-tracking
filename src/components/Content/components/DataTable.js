import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format } from 'd3';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import PropTypes from 'prop-types';

import {
  requestCurrentStateData,
  selectState,
} from '../../../redux/actions/actions';

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Row = styled.tr`
  border-bottom: 1px solid #e0e0e0;
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
  width: 25%;
  text-decoration: ${(props) => (props.sorted ? 'underline' : null)};

  &:not(:first-child) {
    padding-right: 1rem;
    text-align: right;
    cursor: pointer;
    width: 18.75%;
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
  width: 18.75%;
`;

const StateCell = styled(Td)`
  text-align: left;
  padding-left: 0;
  padding-right: 0;
  width: 25%;
`;

const StateText = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Show = styled(Td)`
  background-color: #f9f9f9;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 5px;
`;

export function DataTable({ data, getCurrentData, meta, setSelectedState }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'totalCases',
    direction: 'descending',
  });
  const [sortedData, setSortedData] = useState(null);
  const [filterConfig, setFilterConfig] = useState({ type: 'length', key: '' });

  const formatNumber = format(',');

  useEffect(() => {
    getCurrentData();
  }, []);

  useMemo(() => {
    if (!data) return;
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
    if (sortConfig.key !== key && sortConfig.direction === 'descending') {
      direction = 'descending';
    }
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    if (query === '') {
      setFilterConfig({ type: 'length', key: '' });
    } else {
      setFilterConfig({ type: 'search', key: query });
    }
  };

  const filterTable = () => {
    switch (filterConfig.type) {
      case 'length':
        return sortedData.filter((_, index) => index < 10);
      case 'search':
        return sortedData.filter((state) =>
          meta[state.state].name.toLowerCase().includes(filterConfig.key),
        );
      default:
        return sortedData;
    }
  };

  return (
    <Container>
      <Input
        onChange={(event) => handleInputChange(event)}
        value={searchQuery}
        placeholder="Search"
      />
      {sortedData && meta ? (
        <Table>
          <Head>
            <Row>
              <Th>State</Th>
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
                onClick={() => requestSort('newCases')}
                sorted={sortConfig.key === 'newCases'}
              >
                {sortConfig.key === 'newCases' &&
                  (sortConfig.direction === 'ascending' ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  ))}
                Daily Cases
                <br />
                Increase
              </Th>
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
            {filterTable().map((state) => (
              <Row key={state.hash}>
                <StateCell>
                  <StateText onClick={() => setSelectedState(state.state)}>
                    {meta[state.state].name}
                  </StateText>
                </StateCell>
                <Td>{formatNumber(state.totalCases)}</Td>
                <Td>{formatNumber(state.newCases)}</Td>
                <Td>{formatNumber(state.deaths)}</Td>
                <Td>{formatNumber(state.tests)}</Td>
              </Row>
            ))}
            {filterConfig.type !== 'search' && (
              <Row>
                <Show
                  onClick={() =>
                    setFilterConfig((prev) =>
                      prev.type === 'length'
                        ? { type: '', key: '' }
                        : { type: 'length', key: '' },
                    )
                  }
                  colSpan="5"
                >
                  Show {filterConfig.type === 'length' ? 'all' : 'less'}
                </Show>
              </Row>
            )}
          </Body>
        </Table>
      ) : null}
    </Container>
  );
}

DataTable.defaultProps = {
  data: [],
  meta: {},
};

DataTable.propTypes = {
  data: PropTypes.array,
  meta: PropTypes.object,
  getCurrentData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.currentData.data,
  meta: state.meta.meta,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentData: () => dispatch(requestCurrentStateData()),
  setSelectedState: (state) => dispatch(selectState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
