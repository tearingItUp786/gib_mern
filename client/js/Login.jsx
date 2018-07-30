// @flow
import React from 'react';
import { signIn } from './helpers/authHelper';
import { FieldSet, Label, Input, SubmitButton } from './styling/common';
import { LoginSection, LoginImage, LoginForm, LoginSectionWrapper } from './styling/Login';

const Login = () => {
  /* $FlowFixMe */
  const username = React.createRef();
  /* $FlowFixMe */
  const password = React.createRef();

  async function handleSubmit(evt: SyntheticEvent<HTMLInputElement>) {
    evt.preventDefault();
    try {
      const response = await signIn({
        username: username.current.value,
        password: password.current.value,
        tokenName: 'gibToken'
      });

      if (response) console.log('Success');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <LoginSectionWrapper>
      <LoginSection>
        <LoginImage src="http://www.placepuppy.net/250/150" />
        <LoginForm onSubmit={handleSubmit}>
          <FieldSet>
            <Label>Username</Label>
            <Input type="text" placeholder="Username" innerRef={username} />
          </FieldSet>
          <FieldSet>
            <Label>Password</Label>
            <Input type="password" placeholder="Password" innerRef={password} />
          </FieldSet>
          <SubmitButton type="submit" value="Submit" />
        </LoginForm>
      </LoginSection>
    </LoginSectionWrapper>
  );
};

export default Login;
