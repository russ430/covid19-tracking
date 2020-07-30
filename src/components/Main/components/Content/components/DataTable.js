import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format } from 'd3';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import PropTypes from 'prop-types';

import AboutData from './AboutData';
import ErrorModal from '../../../../ErrorModal';
import {
  requestCurrentStateData,
  selectState,
  clearCurrentStateDataError,
} from '../../../../../redux/actions';

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
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 5px;
`;

export function DataTable({
  clearError,
  data,
  error,
  getCurrentData,
  meta,
  setSelectedState,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'totalCases',
    direction: 'descending',
  });
  const [filterConfig, setFilterConfig] = useState({ type: 'length', key: '' });

  const formatNumber = format(',');

  useEffect(() => {
    getCurrentData();
  }, []);

  const sortedData = useMemo(() => {
    if (!data) return null;
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
    return sortData;
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
    <Container data-testid="container">
      <ErrorModal visible={error} onClose={clearError}>
        Something went wrong retrieving cases and deaths by state. Please try
        again later.
      </ErrorModal>
      {sortedData && meta ? (
        <>
          <Input
            onChange={(event) => handleInputChange(event)}
            value={searchQuery}
            placeholder="Search"
          />
          <Table data-testid="table">
            <thead>
              <Row>
                <Th>&nbsp;</Th>
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
            </thead>
            <tbody>
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
                  <Show colSpan="5">
                    <StateText
                      onClick={() =>
                        setFilterConfig((prev) =>
                          prev.type === 'length'
                            ? { type: '', key: '' }
                            : { type: 'length', key: '' },
                        )
                      }
                    >
                      Show {filterConfig.type === 'length' ? 'all' : 'less'}
                    </StateText>
                  </Show>
                </Row>
              )}
            </tbody>
          </Table>

          <AboutData>
            Some states are reporting total tests as the number of people tested
            while others report the number of specimens tested because some
            people may be tested more than once. Additionally, some states are
            separating the numbers of people tested with PCR and antibody tests;
            in this case the numbers in this table only include PCR tests which
            could have an impact on total testing numbers. Some states&apos;
            totals include residents tested from neighboring states which could
            also have an impact on numbers in this table. Death counts may also
            include both confirmed and presumed or probable COVID deaths.
            Negative daily case increase values denote a correction of previous
            case counts from past dates.
          </AboutData>
        </>
      ) : null}
    </Container>
  );
}

DataTable.defaultProps = {
  data: [],
  meta: {},
  error: null,
};

DataTable.propTypes = {
  clearError: PropTypes.func.isRequired,
  data: PropTypes.array,
  error: PropTypes.object,
  getCurrentData: PropTypes.func.isRequired,
  meta: PropTypes.object,
  setSelectedState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.currentData.data,
  error: state.currentData.error,
  meta: state.meta.meta,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentData: () => dispatch(requestCurrentStateData()),
  setSelectedState: (state) => dispatch(selectState(state)),
  clearError: () => dispatch(clearCurrentStateDataError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
