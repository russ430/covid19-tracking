import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'd3';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0rem;
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
  return (
    <Container>
      <Label>TOTAL CASES:</Label>
      <Data>
        {data ? `${formatNumber(data[data.length - 1].totalCases)}` : '-'}
      </Data>
      <Label>TOTAL DEATHS:</Label>
      <Data>{data ? formatNumber(data[data.length - 1].deaths) : '-'}</Data>
      <Note>*Includes confirmed and probable deaths where available</Note>
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
