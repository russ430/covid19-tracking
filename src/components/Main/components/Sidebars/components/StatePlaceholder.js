import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const State = styled.div`
  width: ${(props) => (props.width ? props.width : 75)}px;
  height: 18px;
  background-color: #eee;
  margin: 0.4rem 0;
`;

export default function StatePlaceholder({ width }) {
  return <State width={width}>&nbsp;</State>;
}

StatePlaceholder.propTypes = {
  width: PropTypes.number.isRequired,
};
