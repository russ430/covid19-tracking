import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './redux/store/configureStore';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1500px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Main />
      </Container>
    </Provider>
  );
}

export default App;
