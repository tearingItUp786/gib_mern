// @flow
import React from 'react';
import { signIn } from './helpers/authHelper';
import { FieldSet, Label, Input } from './styling/common';
import { LoginSection, LoginImage, LoginForm } from './styling/Login';

const Login = () => {
  const username = React.createRef();
  const password = React.createRef();

  async function handleSubmit(evt: SyntheticEvent<HTMLInputElement>) {
    evt.preventDefault();
    try {
      console.log(username.current.value);

      const response = await signIn({
        username: username.current.value,
        password: password.current.value,
        token: 'gibToken'
      });

      if (response) console.log('Success');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
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
        <input type="submit" value="Submit" />
      </LoginForm>
    </LoginSection>
  );
};

export default Login;
