// @flow

import styled, { keyframes } from 'styled-components';
import defaultTheme from './common';

export const DonutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const DonutSpinner = styled.div`
  display: inline-block;
  border: 7px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${defaultTheme.accentColor};
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: ${DonutSpin} 1.2s linear infinite;
`;

export const SpinnerContainer = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
