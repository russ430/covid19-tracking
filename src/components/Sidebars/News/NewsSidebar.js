import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
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
`;

const Article = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem 0;

  &:not(:first-child) {
    border-top: 1px solid #e7e7e7;
  }
`;

const ATitle = styled.h3`
  font-family: 'Merriweather', serif,
  font-size: 1rem;
  font-weight: 700;
  margin: 0.5rem 0 0.2rem 0;
  padding: 0;
`;

const ABody = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-style: italic;
  margin: 0;
  padding: 0;
`;

export default function NewsSidebar() {
  return (
    <Container>
      <Title>News</Title>
      <Line />
      <Articles>
        <Article>
          <ATitle>Headline</ATitle>
          <ABody>
            Lorem ipsum dolor this is the body of an news article headline
          </ABody>
        </Article>
        <Article>
          <ATitle>Headline</ATitle>
          <ABody>
            Lorem ipsum dolor this is the body of an news article headline
          </ABody>
        </Article>
        <Article>
          <ATitle>Headline</ATitle>
          <ABody>
            Lorem ipsum dolor this is the body of an news article headline
          </ABody>
        </Article>
      </Articles>
    </Container>
  );
}
