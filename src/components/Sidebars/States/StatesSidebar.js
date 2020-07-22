/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from '../Sidebar';
import dummyStates from '../../../utils/dummyVariables/statesPlaceholders';
import getRandomInt from '../../../utils/getRandomInt';
import {
  fetchAllStatesMeta,
  selectState,
} from '../../../redux/actions/actions';
import StatesPlaceholder from '../../PlaceHolders/StatePlaceholder';

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-family: 'Merriweather', serif;
  margin: 1rem 0;
  padding: 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 0.5rem 0;
`;

const State = styled.h3`
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  text-decoration: ${(props) => (props.selected ? 'underline' : null)};
  padding: 0;
  margin: 0.5rem 0;
  cursor: pointer;
  align-self: flex-start;
`;

export function StatesSidebar({ states, getMeta, selected, setSelected }) {
  useEffect(() => {
    getMeta();
  }, []);

  const handleOnClick = (state) => {
    setSelected(state);
  };

  return (
    <Container>
      <Title>States/Territories</Title>
      <Line />
      <Sidebar>
        {states ? (
          <>
            <State
              selected={selected === 'all'}
              onClick={() => handleOnClick('all')}
            >
              US Totals
            </State>
            {states.map((state) => (
              <State
                selected={selected === state.state}
                key={state.id}
                onClick={() => handleOnClick(state.state)}
              >
                {state.name}
              </State>
            ))}
          </>
        ) : (
          dummyStates.map((_, i) => (
            <StatesPlaceholder key={i} width={getRandomInt(75, 135)} />
          ))
        )}
      </Sidebar>
    </Container>
  );
}

StatesSidebar.defaultProps = {
  states: [{}],
};

StatesSidebar.propTypes = {
  states: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string.isRequired,
  getMeta: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.meta.meta,
  selected: state.selected.selected,
});

const mapDispatchToProps = (dispatch) => ({
  getMeta: () => dispatch(fetchAllStatesMeta()),
  setSelected: (state) => dispatch(selectState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatesSidebar);
