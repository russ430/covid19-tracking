import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './redux/store/configureStore';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 0 auto;
  padding: 1rem 2rem;

  @media screen and (max-width: 900px) {
    padding: 1rem;
  }
`;

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Main />
        <Footer />
      </Container>
    </Provider>
  );
}

export default App;
