import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 3rem auto 0 auto;
  text-align: center;
  max-width: 600px;
  padding: 0 0.5rem;

  @media screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

const Text = styled.p`
  font-size: 0.8rem;
  color: #909090;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;

  a {
    color: #909090;
  }

  @media screen and (max-width: 650px) {
    font-size: 0.7rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.6rem;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Text>
        All data is obtained from{' '}
        <a
          href="https://www.covidtracking.com/data"
          rel="noreferrer noopener"
          target="_blank"
        >
          The COVID Tracking Project
        </a>{' '}
        and is used and published under a{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          rel="noreferrer noopener"
          target="_blank"
        >
          CreativeCommons CC BY-NY-4.0 license
        </a>
      </Text>
    </Container>
  );
}
