import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import formatNumber from '../../utils/formatNumber';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
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

export function NumericalData({ data }) {
  return (
    <Container>
      <Label>TOTAL CASES:</Label>
      <Data>{data ? formatNumber(data[data.length - 1].positive) : '-'}</Data>
      <Label>TOTAL DEATHS:</Label>
      <Data>{data ? formatNumber(data[data.length - 1].death) : '-'}</Data>
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
  data: state.data.data,
});

export default connect(mapStateToProps)(NumericalData);
