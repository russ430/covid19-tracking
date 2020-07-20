import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getRandomInt from '../../../utils/getRandomInt';
import {
  fetchAllStatesMeta,
  selectState,
} from '../../../redux/actions/actions';
import StatesPlaceholder from '../../PlaceHolders/StatePlaceholder';

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
  font-size: ${(props) => (props.selected ? '1.2rem' : '1rem')};
  font-family: 'Open Sans', sans-serif;
  padding: 0;
  margin: 0.5rem 0;
  cursor: pointer;
  align-self: flex-start;
  font-style: ${(props) => (props.selected ? 'italic' : null)};
`;

const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 , 1];

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
      <States>
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
                key={state.fips}
                onClick={() => handleOnClick(state.state)}
              >
                {state.name}
              </State>
            ))}
          </>
        ) : (
          dummy.map(() => <StatesPlaceholder width={getRandomInt(75, 135)} />)
        )}
      </States>
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
