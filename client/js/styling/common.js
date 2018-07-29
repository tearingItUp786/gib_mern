import { injectGlobal } from 'styled-components';

const defaultTheme = {
  mainColor: '#ffffff',
  accentColor: '#044072',
  subAccentColor: '#eeeeee'
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

export default defaultTheme;
