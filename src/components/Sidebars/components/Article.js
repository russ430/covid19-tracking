import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 0.5rem 0;
  margin: 0.5rem 0;

  &:not(:first-child) {
    border-top: 1px solid #e7e7e7;
    padding: 1rem 0 0.5rem 0;
  }
`;

const Title = styled.a`
  font-family: 'Open Sans', sans-serif;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0 0.2rem 0;
  padding: 0;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
  padding: 0 0.4rem;
`;

const PublishDate = styled.p`
  margin: 0;
  margin-bottom: 0.3rem;
  padding: 0;
  font-size: 1rem;
`;

export default function Article({ data }) {
  const { link, title, content, isoDate } = data;
  const date = format(new Date(isoDate), 'PPP');
  return (
    <Container>
      <Title href={link} rel="noreferrer noopener" target="_blank">
        {title}
      </Title>
      <PublishDate>- {date}</PublishDate>
      <Content>{content}</Content>
    </Container>
  );
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
};
