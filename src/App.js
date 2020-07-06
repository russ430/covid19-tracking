import React from 'react';
import styled from 'styled-components';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

function App() {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  );
}

export default App;
