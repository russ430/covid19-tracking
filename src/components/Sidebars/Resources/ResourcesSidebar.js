import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResourcePlaceholder from '../../PlaceHolders/ResourcePlaceholder';
import Article from '../../Article/Article';
import { fetchResources } from '../../../redux/actions/actions';

const Container = styled.div`
  flex: 1.5;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-family: 'Merriweather', serif;
  margin: 0;
  padding: 0 0.5rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 1rem 0;
`;

const Articles = styled.div`
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

export function ResourceSidebar({ getResources, resources }) {
  useEffect(() => {
    getResources();
  }, []);

  const dummy = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <Container>
      <Title>CDC Resources</Title>
      <Line />
      <Articles>
        {resources
          ? resources.map((article) => (
              <Article data={article} key={article.title} />
            ))
          : (
            dummy.map(() => <ResourcePlaceholder />)
          )}
      </Articles>
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
  getResources: () => dispatch(fetchResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceSidebar);
