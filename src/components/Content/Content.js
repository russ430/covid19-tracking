import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setGraphDataToNewCases,
  setGraphDataToNewDeaths,
} from '../../redux/actions/actions';
import DataTable from './components/DataTable';
import Loader from '../Loader/Loader';
import NewCasesGraph from './components/NewCasesGraph';
import NumericalData from './components/NumericalData';

const Container = styled.section`
  padding: 0 0.5rem;
  margin: 0 auto;
  flex: 4.5;
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

const Header = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  margin: 2rem 0;
  padding: 0;
  text-align: center;
`;

const Buttons = styled.div`
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem 4rem;
  border: ${(props) =>
    props.selected ? '1px solid #000' : '1px solid #e2e2e2'};
  background-color: #efefef;
  border-radius: 5px;
  margin: 0 0.2rem;
  color: #000;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`;

export function Content({
  graphSelected,
  isFetching,
  meta,
  selectedState,
  setGraphToNewCases,
  setGraphToNewDeaths,
}) {
  return (
    <Container>
      <Title>
        {selectedState === 'all' ? 'United States' : meta[selectedState].name}
      </Title>
      <Load>{isFetching && <Loader />}</Load>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <NewCasesGraph />
          <Buttons>
            <Button
              type="button"
              selected={graphSelected === 'Cases'}
              onClick={() => setGraphToNewCases()}
            >
              Cases
            </Button>
            <Button
              type="button"
              selected={graphSelected === 'Deaths'}
              onClick={() => setGraphToNewDeaths()}
            >
              Deaths
            </Button>
          </Buttons>
        </div>
        <NumericalData />
      </div>
      <div
        style={{
          margin: '0 auto',
          marginTop: '1rem',
          padding: '1rem 0',
          maxWidth: '900px',
        }}
      >
        <Header>Cases and Deaths by State</Header>
        <DataTable />
      </div>
    </Container>
  );
}

Content.defaultProps = {
  meta: {},
};

Content.propTypes = {
  selectedState: PropTypes.string.isRequired,
  meta: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  graphSelected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedState: state.selected.selected,
  meta: state.meta.meta,
  isFetching: state.dailyData.isFetching,
  graphSelected: state.graph.name,
});

const mapDispatchToProps = (dispatch) => ({
  setGraphToNewCases: () => dispatch(setGraphDataToNewCases()),
  setGraphToNewDeaths: () => dispatch(setGraphDataToNewDeaths()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
