import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchAllStatesMeta } from '../../../redux/actions/actions';

const Container = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-family: 'Merriweather', serif;
  margin: 0;
  padding: 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 1rem 0;
`;

const States = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  height: 425px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  &::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const State = styled.h3`
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  padding: 0;
  margin: 0.5rem 0;
`;

export function StatesSidebar({ states, getStates }) {
  useEffect(() => {
    getStates();
  }, []);

  return (
    <Container>
      <Title>States/Territories</Title>
      <Line />
      <States>
        {states ? (
          states.map((state) => <State key={state.fips}>{state.name}</State>)
        ) : (
          <h2>Loading...</h2>
        )}
      </States>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  states: state.states.meta,
});

const mapDispatchToProps = (dispatch) => ({
  getStates: () => dispatch(fetchAllStatesMeta()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatesSidebar);
