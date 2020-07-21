import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DataTable from '../DataTable/DataTable';
import Loader from '../Loader/Loader';
import NewCasesGraph from '../Graphs/NewCasesGraph';
import NumericalData from '../NumericalData/NumericalData';

const Container = styled.section`
  padding: 0 0.5rem;
  margin: 0;
  flex: 4;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Load = styled.div`
  height: 1.6em;
  margin-top: 0.5rem;
`;

export function Content({ isFetching, meta, selectedState }) {
  return (
    <Container>
      <Title>
        {selectedState === 'all'
          ? 'United States'
          : meta.find((state) => state.state === selectedState).name}
      </Title>
      <Load>{isFetching && <Loader />}</Load>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NewCasesGraph />
        <NumericalData />
      </div>
      <DataTable />
    </Container>
  );
}

Content.defaultProps = {
  meta: [{}],
};

Content.propTypes = {
  selectedState: PropTypes.string.isRequired,
  meta: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  selectedState: state.selected.selected,
  meta: state.meta.meta,
  isFetching: state.dailyData.isFetching,
});

export default connect(mapStateToProps)(Content);
