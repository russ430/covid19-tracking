/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { range as d3range } from 'd3';

import ErrorModal from '../ErrorModal/ErrorModal';
import Sidebar from './components/Sidebar';
import ResourcePlaceholder from '../PlaceHolders/ResourcePlaceholder';
import Article from './components/Article';
import {
  requestCDCResources,
  clearResourcesError,
} from '../../redux/actions/actions';

const Container = styled.div`
  margin-top: 1rem;
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

export function ResourceSidebar({
  getResources,
  resources,
  error,
  clearError,
  isFetching,
}) {
  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <ErrorModal visible={error} onClose={clearError}>
        Unable to retrieve list of CDC Resources. Please try again later.
      </ErrorModal>
      <Line />
      <Title>CDC Resources</Title>
      <Line />
      <Sidebar>
        {resources
          ? resources.map((article) => (
              <Article data={article} key={article.title} />
            ))
          : isFetching &&
            d3range(20).map((_, i) => <ResourcePlaceholder key={i} />)}
      </Sidebar>
    </Container>
  );
}

ResourceSidebar.defaultProps = {
  resources: [],
  error: null,
};

ResourceSidebar.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object),
  getResources: PropTypes.func.isRequired,
  error: PropTypes.object,
  clearError: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  resources: state.resources.resources,
  error: state.resources.error,
  isFetching: state.resources.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getResources: () => dispatch(requestCDCResources()),
  clearError: () => dispatch(clearResourcesError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceSidebar);
