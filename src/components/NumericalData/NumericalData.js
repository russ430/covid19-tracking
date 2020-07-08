import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import formatNumber from '../../utils/formatNumber';
import { fetchCurrentUSDataTotals } from '../../redux/actions/actions';

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

export function NumericalData({
  usTotals,
  getUSTotals,
  selectedState,
  stateData,
}) {
  useEffect(() => {
    getUSTotals();
  }, []);

  return (
    <Container>
      {stateData && selectedState !== 'all' && (
        <>
          <Label>TOTAL CASES:</Label>
          <Data>{formatNumber(stateData[0].positive)}</Data>
          <Label>TOTAL DEATHS:</Label>
          <Data>{formatNumber(stateData[0].death)}</Data>
        </>
      )}
      {usTotals && selectedState === 'all' ? (
        <>
          <Label>TOTAL CASES:</Label>
          <Data>{formatNumber(usTotals.positive)}</Data>
          <Label>TOTAL DEATHS:</Label>
          <Data>{formatNumber(usTotals.death)}</Data>
        </>
      ) : null}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  usTotals: state.us.current,
  stateData: state.states.data,
  stateMeta: state.states.meta,
  selectedState: state.states.selected,
});

const mapDispatchToProps = (dispatch) => ({
  getUSTotals: () => dispatch(fetchCurrentUSDataTotals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumericalData);
