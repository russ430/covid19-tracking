import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'd3';

const Container = styled.div`
  margin: 0 0 1rem 1rem;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0 0.5rem 0;
`;

const DataGroup = styled.div`
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;

const Label = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Data = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const Note = styled.h3`
  font-size: 0.9rem;
  width: 250px;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
  color: #777;
  font-style: italic;
  margin: 0.5rem 0;
  padding: 0;
`;

export function NumericalData({ data }) {
  const formatNumber = format(',');

  let cases = '-';
  let deaths = '-';

  if (data) {
    const selection = data[data.length - 1];
    cases = formatNumber(selection.totalCases);
    deaths = formatNumber(selection.deaths);
  }

  return (
    <Container>
      <DataContainer>
        <DataGroup>
          <Label>TOTAL CASES:</Label>
          <Data data-testid="cases">{cases}</Data>
        </DataGroup>
        <DataGroup>
          <Label>TOTAL DEATHS:</Label>
          <Data data-testid="deaths">{deaths}</Data>
        </DataGroup>
      </DataContainer>
      <Note>
        *Includes confirmed and probable cases and deaths where available
      </Note>
    </Container>
  );
}

NumericalData.defaultProps = {
  data: [{}],
};

NumericalData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  data: state.dailyData.data,
});

export default connect(mapStateToProps)(NumericalData);
