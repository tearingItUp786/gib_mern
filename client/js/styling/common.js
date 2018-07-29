// @flow

import styled, { injectGlobal } from 'styled-components';
import CreatedLabel from '../common/Label';

const defaultTheme = {
  mainColor: '#ffffff',
  accentColor: '#044072',
  subAccentColor: '#eeeeee',
  mobileBreak: '768px'
};

injectGlobal`
  body {
    background: ${defaultTheme.subAccentColor};

    h1,h2,h3,h4,h5,h6 {
      font-family: 'Oswald', sans-serif;
    }

    p {
      font-family: 'Roboto', sans-serif;
    }
  }
`;

export const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  font-family: 'Oswald', sans-serif;
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
`;

export const Label = styled(CreatedLabel)`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  background: white;
  padding: 10px 10px;
  box-shadow: none;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.5px;
  border: solid #044072 2px;
`;

export default defaultTheme;
