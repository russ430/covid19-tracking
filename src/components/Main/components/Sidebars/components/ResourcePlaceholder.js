import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0.5rem 0;

  &:not(:first-child) {
    border-top: 1px solid #e7e7e7;
    margin: 0.5rem 0;
  }
`;

const Title = styled.div`
  width: ${(props) => props.width}%;
  height: 20px;
  background-color: #eee;
  margin-top: 0.5rem;
`;

const PublishedDate = styled(Title)`
  width: 65px;
  height: 14px;
  margin: 0.4rem 0;
`;

const Content = styled(Title)`
  width: 80%;
  height: 12px;
  margin-top: 0.3rem;
`;

export default function ResourcePlaceholder() {
  return (
    <Container>
      <Title width={90} />
      <Title width={70} />
      <PublishedDate />
      <Content />
      <Content />
    </Container>
  );
}
