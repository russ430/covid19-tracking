import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding: 0 0.5rem;
  margin: 0;
  flex: 4;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default function Content() {
  return (
    <Container>
      <Title>Current Map and Case Count</Title>
    </Container>
  );
}
