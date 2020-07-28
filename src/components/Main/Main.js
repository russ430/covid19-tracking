import React from 'react';
import styled from 'styled-components';

import StateSidebar from './components/Sidebars/StatesSidebar';
import ResourcesSidebar from './components/Sidebars/ResourcesSidebar';
import Content from './components/Content/Content';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Sidebars = styled.div`
  flex: 1;
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
