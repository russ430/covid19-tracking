import React from 'react';
import styled from 'styled-components';

import StateSidebar from '../Sidebars/States/StatesSidebar';
import Content from '../Content/Content';
import ResourcesSidebar from '../Sidebars/Resources/ResourcesSidebar';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Sidebars = styled.div``;

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
