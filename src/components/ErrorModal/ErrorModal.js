import React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Modal = styled.div`
  position: fixed;
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  padding-top: 1.5rem;
`;

const Text = styled.h3`
  font-family: 'Merriweather', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  text-align: center;
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.7rem;
  cursor: pointer;
`;

export default function ErrorModal({ visible, children, onClose }) {
  return (
    <>
      {visible && (
        <Container onClick={onClose}>
          <Modal>
            <Close onClick={onClose}>
              <GrClose size="1.7rem" />
            </Close>
            <Text data-testid="children">{children}</Text>
          </Modal>
        </Container>
      )}
    </>
  );
}
