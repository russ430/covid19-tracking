/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from './components/Sidebar';
import dummyStates from '../../utils/dummyVariables/statesPlaceholders';
import getRandomInt from '../../utils/getRandomInt';
import { requestAllStatesMeta, selectState } from '../../redux/actions/actions';
import StatesPlaceholder from '../PlaceHolders/StatePlaceholder';

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

export function StatesSidebar({ meta, getMeta, selected, setSelected }) {
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
        {meta ? (
          <>
            <State
              selected={selected === 'all'}
              onClick={() => handleOnClick('all')}
            >
              US Totals
            </State>
            {Object.keys(meta)
              .sort((a, b) => (meta[a].name > meta[b].name ? 1 : -1))
              .map((state) => (
                <State
                  selected={selected === state}
                  key={meta[state].id}
                  onClick={() => handleOnClick(meta[state].state)}
                >
                  {meta[state].name}
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
  meta: {},
};

StatesSidebar.propTypes = {
  meta: PropTypes.object,
  selected: PropTypes.string.isRequired,
  getMeta: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meta: state.meta.meta,
  selected: state.selected.selected,
});

const mapDispatchToProps = (dispatch) => ({
  getMeta: () => dispatch(requestAllStatesMeta()),
  setSelected: (state) => dispatch(selectState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatesSidebar);
