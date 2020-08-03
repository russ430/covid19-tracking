import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectState } from '../../../../../redux/actions';

import Sidebar from '../../Sidebars/components/Sidebar';

const Container = styled.div`
  display: none;
`;

const State = styled.h3`
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 1rem 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  background-color: ${(props) => (props.selected ? '#eee' : '#fff')};
`;

export function StatesDropdown({
  meta,
  selectedState,
  setSelectedState,
  setShowDropdown,
}) {
  const handleOnStateClick = (state) => {
    setSelectedState(state);
    setShowDropdown(false);
  };
  return (
    <Container>
      <Sidebar>
        {meta && (
          <>
            <State
              selected={selectedState === 'all'}
              onClick={() => handleOnStateClick('all')}
            >
              US Totals
            </State>
            {Object.keys(meta)
              .sort((a, b) => (meta[a].name > meta[b].name ? 1 : -1))
              .map((state) => (
                <State
                  selected={selectedState === state}
                  key={meta[state].id}
                  onClick={() => handleOnStateClick(state)}
                >
                  {meta[state].name}
                </State>
              ))}
          </>
        )}
      </Sidebar>
    </Container>
  );
}

StatesDropdown.defaultProps = {
  meta: {},
};

StatesDropdown.propTypes = {
  meta: PropTypes.object,
  selectedState: PropTypes.string.isRequired,
  setSelectedState: PropTypes.func.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  meta: state.meta.meta,
  selectedState: state.selected.selected,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedState: (state) => dispatch(selectState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatesDropdown);
