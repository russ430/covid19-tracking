import React from 'react';
import styled from 'styled-components';

import StateSidebar from './components/Sidebars/StatesSidebar';
import ResourcesSidebar from './components/Sidebars/ResourcesSidebar';
import Content from './components/Content/Content';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const Sidebars = styled.div`
  flex: 1;

  @media screen and (max-width: 950px) {
    display: none;
  }
`;

export default function Main() {
  return (
    <Container>
      <Sidebars>
        <StateSidebar />
        <ResourcesSidebar />
      </Sidebars>
      <Content />
    </Container>
  );
}
