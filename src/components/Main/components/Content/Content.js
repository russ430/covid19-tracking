import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsChevronDown } from 'react-icons/bs';

import {
  setGraphDataToNewCases,
  setGraphDataToNewDeaths,
} from '../../../../redux/actions';

import StatesDropdown from './components/StatesDropdown';
import AboutData from './components/AboutData';
import DataTable from './components/DataTable';
import Loader from '../../../Loader';
import Graph from './components/Graph';
import NumericalData from './components/NumericalData';

const Container = styled.section`
  padding: 0 0.5rem;
  margin: 0 auto;
  flex: 4.5;

  @media screen and (max-width: 950px) {
    flex: 1;
  }
`;

const Header = styled.div`
  position: relative;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;

  @media screen and (max-width: 650px) {
    font-size: 2rem;
  }
`;

const ChevronDown = styled(BsChevronDown)`
  display: none;

  @media screen and (max-width: 950px) {
    display: inline-block;
    margin: 0 1rem;
  }
`;

const Load = styled.div`
  height: 1.6em;
  margin-top: 0.5rem;
`;

const GraphAndNumbers = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1150px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const SecondaryTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  margin: 2rem 0;
  padding: 0;
  text-align: center;

  @media screen and (max-width: 650px) {
    font-size: 1.3rem;
  }
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

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.3rem 2rem;
  }
`;

const DataTableSection = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  padding: 1rem 0;
  max-width: 900px;

  @media screen and (max-width: 500px) {
    margin-top: 0;
    padding: 0 0 1rem 0;
  }
`;

export function Content({
  graphSelected,
  isFetching,
  meta,
  selectedState,
  setGraphToNewCases,
  setGraphToNewDeaths,
}) {
  const [isStatesDropdownVisible, setIsStatesDropdownVisible] = useState(false);
  const selectedStateName =
    selectedState === 'all' ? 'United States' : meta[selectedState].name;

  const covidSite =
    selectedState === 'all'
      ? 'https://www.state.gov/coronavirus/'
      : meta[selectedState].covidSite;
  return (
    <Container>
      <Header>
        {isStatesDropdownVisible && (
          <StatesDropdown setShowDropdown={setIsStatesDropdownVisible} />
        )}
        <Title
          onClick={() => setIsStatesDropdownVisible(!isStatesDropdownVisible)}
        >
          {selectedStateName}
          <ChevronDown
            size="1.5rem"
            onClick={() => setIsStatesDropdownVisible(!isStatesDropdownVisible)}
          />
        </Title>
      </Header>
      <Load>{isFetching && <Loader />}</Load>
      <GraphAndNumbers>
        <div style={{ marginBottom: '2rem' }}>
          <Graph />
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
          <AboutData>
            On certain days some states&apos; data has included a backlog of
            data which had not been reported for several days. This can result
            in higher than reported cases or deaths on those days and should be
            taken into account accordingly. Some states also did not update
            numbers of case or death counts on various days resulting in reports
            of 0 numbers for data respectively. Additionally, case counts for
            certain states included people who tested positive for COVID-19 AND
            people who have symptoms of COVID-19 and are a close contact to
            someone who tested positive. Days where cases or deaths are negative
            denote the state correcting previous incorrect counts of the
            respective datum. Some states are also releasing probable cases and
            deaths which would cause total cases and total deaths to spike in
            this dataset. Death counts may also include both confirmed and
            presumed or probable COVID deaths. For more information specific to{' '}
            {selectedStateName}-related coronavirus information please visit
            their website dedicated to COVID-19{' '}
            <a href={`${covidSite}`} rel="noreferrer noopener" target="_blank">
              here
            </a>
            .
          </AboutData>
        </div>
        <NumericalData />
      </GraphAndNumbers>
      <DataTableSection>
        <SecondaryTitle>Cases and Deaths by State</SecondaryTitle>
        <DataTable />
      </DataTableSection>
    </Container>
  );
}

Content.defaultProps = {
  meta: {},
};

Content.propTypes = {
  graphSelected: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  meta: PropTypes.object,
  selectedState: PropTypes.string.isRequired,
  setGraphToNewCases: PropTypes.func.isRequired,
  setGraphToNewDeaths: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  graphSelected: state.graph.name,
  isFetching: state.dailyData.isFetching,
  meta: state.meta.meta,
  selectedState: state.selected.selected,
});

const mapDispatchToProps = (dispatch) => ({
  setGraphToNewCases: () => dispatch(setGraphDataToNewCases()),
  setGraphToNewDeaths: () => dispatch(setGraphDataToNewDeaths()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
