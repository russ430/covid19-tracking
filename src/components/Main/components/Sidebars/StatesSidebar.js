/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { range as d3range } from 'd3';
import { TiArrowSortedUp } from 'react-icons/ti';

import ErrorModal from '../../../ErrorModal';
import Sidebar from './components/Sidebar';
import getRandomInt from '../../../../utils/getRandomInt';
import {
  requestAllStatesMeta,
  selectState,
  clearAllStatesMetaError,
} from '../../../../redux/actions';
import StatesPlaceholder from './components/StatePlaceholder';

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
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  padding: 0;
  margin: 0.5rem 0;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled(TiArrowSortedUp)`
  transform: rotate(90deg);
  color: ${(props) => (props.selected ? '#000' : '#fff')};
  vertical-align: middle;
  margin-right: 0.1rem;
`;

export function StatesSidebar({
  clearError,
  error,
  getMeta,
  isFetching,
  meta,
  selected,
  setSelected,
}) {
  useEffect(() => {
    getMeta();
  }, []);

  const handleOnClickState = (state) => {
    setSelected(state);
  };

  return (
    <Container>
      <ErrorModal visible={error} onClose={clearError}>
        Unable to retrieve state data. Please try again later.
      </ErrorModal>
      <Title>States/Territories</Title>
      <Line />
      <Sidebar>
        {meta ? (
          <>
            <State
              selected={selected === 'all'}
              onClick={() => handleOnClickState('all')}
            >
              <Arrow selected={selected === 'all'} />
              US Totals
            </State>
            {Object.keys(meta)
              .sort((a, b) => (meta[a].name > meta[b].name ? 1 : -1))
              .map((state) => (
                <State
                  selected={selected === state}
                  key={meta[state].id}
                  onClick={() => handleOnClickState(state)}
                >
                  <Arrow selected={selected === state} />
                  {meta[state].name}
                </State>
              ))}
          </>
        ) : (
          isFetching &&
          d3range(56).map((_, i) => (
            <StatesPlaceholder key={i} width={getRandomInt(75, 135)} />
          ))
        )}
      </Sidebar>
    </Container>
  );
}

StatesSidebar.defaultProps = {
  meta: {},
  error: null,
};

StatesSidebar.propTypes = {
  clearError: PropTypes.func.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  getMeta: PropTypes.func.isRequired,
  meta: PropTypes.object,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meta: state.meta.meta,
  selected: state.selected.selected,
  error: state.meta.error,
  isFetching: state.meta.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getMeta: () => dispatch(requestAllStatesMeta()),
  setSelected: (state) => dispatch(selectState(state)),
  clearError: () => dispatch(clearAllStatesMetaError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatesSidebar);
