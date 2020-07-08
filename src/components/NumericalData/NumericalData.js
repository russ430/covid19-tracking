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
`;

const Data = styled.h2`
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

export function NumericalData({ usTotals, getCurrent }) {
  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <Container>
      {usTotals ? (
        <>
          <Label>TOTAL CASES:</Label>
          <Data>{formatNumber(usTotals.positive)}</Data>
          <Label style={{ marginTop: '1rem' }}>TOTAL DEATHS:</Label>
          <Data>{formatNumber(usTotals.death)}</Data>
        </>
      ) : null}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  usTotals: state.us.current,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrent: () => dispatch(fetchCurrentUSDataTotals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumericalData);
