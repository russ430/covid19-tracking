/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaTwitter } from 'react-icons/fa';
import { GoGlobe } from 'react-icons/go';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 0 2rem 1rem 2rem;
`;

const Header = styled.h3`
  font-family: 'Merriweather', serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
  padding: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0 0 0 0.2rem;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  font-family: 'Open Sans', sans-serif;
  color: #000;
  text-decoration: none;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export function StateResources({ meta, selected }) {
  let selectedMeta;
  if (meta) {
    selectedMeta = meta.find((state) => state.state === selected);
  }

  return (
    <Container>
      <Header>Additional Resources</Header>
      <List>
        {selectedMeta ? (
          <>
            <Item>
              <GoGlobe style={{ verticalAlign: 'middle' }} />
              <Link
                href={selectedMeta.covid19Site}
                rel="noreferrer noopener"
                target="_blank"
              >
                {selectedMeta.name} Coronavirus Site
              </Link>
            </Item>
            {selectedMeta.twitterHandle && (
              <Item>
                <FaTwitter style={{ verticalAlign: 'middle' }} />
                <Link
                  href={`https://www.twitter.com/${selectedMeta.twitterHandle}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {selectedMeta.twitterHandle}
                </Link>
              </Item>
            )}
          </>
        ) : (
          <Item>
            <GoGlobe style={{ verticalAlign: 'middle' }} />
            <Link
              href="https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html"
              rel="noreferrer noopener"
              target="_blank"
            >
              CDC's U.S. Coronavirus Site
            </Link>
          </Item>
        )}
      </List>
    </Container>
  );
}

StateResources.defaultProps = {
  meta: [],
};

StateResources.propTypes = {
  meta: PropTypes.array,
  selected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  meta: state.meta.meta,
  selected: state.selected.selected,
});

export default connect(mapStateToProps)(StateResources);
