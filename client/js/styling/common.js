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

    input,p {
      font-family: 'Roboto', sans-serif;
    }
  }
`;

export const FieldSet = styled.fieldset`
  border: none;
  padding: 0;
  font-family: 'Oswald', sans-serif;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 0;
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
  border: solid 2px ${props => props.theme.accentColor};
`;

export const SubmitButton = styled.input`
  border: none;
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.theme.mainColor};
  text-transform: uppercase;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: 300;
  letter-spacing: 2px;
  transition: background 0.3s, border 0.3s, color 0.3s;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainColor};
    color: ${props => props.theme.accentColor};
    border: solid 2px ${props => props.theme.accentColor};
  }
`;

export default defaultTheme;
