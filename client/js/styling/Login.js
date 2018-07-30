import styled from 'styled-components';

export const LoginSectionWrapper = styled.section`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;

export const LoginSection = styled.article`
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.theme.mainColor};
  box-sizing: border-box;
  padding: 40px;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.175);
`;

export const LoginImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const LoginForm = styled.form`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
