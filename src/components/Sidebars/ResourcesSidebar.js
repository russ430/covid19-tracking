/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from './components/Sidebar';
import dummyPlaceholders from '../../utils/dummyVariables/resourcesPlaceholders';
import ResourcePlaceholder from '../PlaceHolders/ResourcePlaceholder';
import Article from './components/Article';
import { requestResources } from '../../redux/actions/actions';

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

export function ResourceSidebar({ getResources, resources }) {
  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <Line />
      <Title>CDC Resources</Title>
      <Line />
      <Sidebar>
        {resources
          ? resources.map((article) => (
              <Article data={article} key={article.title} />
            ))
          : dummyPlaceholders.map((_, i) => <ResourcePlaceholder key={i} />)}
      </Sidebar>
    </Container>
  );
}

ResourceSidebar.defaultProps = {
  resources: null,
};

ResourceSidebar.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.object),
  getResources: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  resources: state.resources.resources,
});

const mapDispatchToProps = (dispatch) => ({
  getResources: () => dispatch(requestResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceSidebar);
