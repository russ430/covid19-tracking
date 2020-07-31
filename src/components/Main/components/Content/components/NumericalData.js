import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'd3';

const Container = styled.div`
  margin: 0 0 1rem 0;

  @media screen and (max-width: 1150px) {
    margin-bottom: 3rem;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0 0.5rem 0;

  @media screen and (max-width: 1150px) {
    flex-direction: row;
    margin: 1rem 0;
  }
`;

const DataGroup = styled.div`
  margin: 0;

  @media screen and (max-width: 1150px) {
    margin: 0 1.5rem;
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

  @media screen and (max-width: 1150px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 650px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.85rem;
  }
`;

const Data = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 1150px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 650px) {
    font-size: 1.8rem;
  }
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

  @media screen and (max-width: 1150px) {
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 650px) {
    font-size: 0.75rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.6rem;
  }
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
