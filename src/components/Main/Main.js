import React from 'react';
import styled from 'styled-components';

import StateSidebar from '../Sidebars/States/StatesSidebar';
import Content from '../Content/Content';
import NewsSidebar from '../Sidebars/News/NewsSidebar';

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export default function Main() {
  return (
    <Container>
      <StateSidebar />
      <Content />
      <NewsSidebar />
    </Container>
  );
}
