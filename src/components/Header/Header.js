import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { format } from 'date-fns';

const Container = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  padding: 0.5rem 0;
  margin: 0;
  flex: 1;
  border-bottom: 1px solid #ddd;
`;

const UpdatedAt = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0.5rem 0;
`;

export function Header({ lastUpdated }) {
  return (
    <Container>
      <Title>Coronavirus in the U.S.</Title>
      <UpdatedAt>
        Last Updated: {lastUpdated && format(new Date(lastUpdated), 'PPPp')}
      </UpdatedAt>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  lastUpdated: state.data.lastUpdated,
});

export default connect(mapStateToProps)(Header);
