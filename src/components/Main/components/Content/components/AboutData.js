import React, { useState } from 'react';
import styled from 'styled-components';
import { TiArrowSortedDown } from 'react-icons/ti';

const Container = styled.div`
  margin: 1rem 0;
  width: 550px;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const Header = styled.h3`
  font-size: 0.8rem;
  font-family: 'Open-sans', sans-serif;
  font-weight: 400;
  color: #909090;
  display: inline-block;
  margin: 0;
  padding: 0;
  text-decoration: underline;
  margin-left: 0.1rem;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    font-size: 0.6rem;
  }
`;

const Caption = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  color: #909090;
  margin-left: 1rem;

  @media screen and (max-width: 450px) {
    font-size: 0.6rem;
  }
`;

export default function AboutData({ children }) {
  const [showText, setShowText] = useState(false);

  return (
    <Container>
      <TiArrowSortedDown
        size="1rem"
        style={{
          verticalAlign: 'middle',
          color: '#909090',
          transform: !showText && 'rotate(-90deg)',
        }}
      />
      <Header onClick={() => setShowText(!showText)}>About this data</Header>
      {showText && <Caption>{children}</Caption>}
    </Container>
  );
}
