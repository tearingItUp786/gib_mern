// @flow
import React from 'react';
import Label from './common/Label';
import { signIn } from './helpers/authHelper';

const Login = () => {
  const username = React.createRef();
  const password = React.createRef();

  async function handleSubmit(evt: SyntheticEvent<HTMLInputElement>) {
    evt.preventDefault();
    try {
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
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Label>Username</Label>
        <input type="text" placeholder="Username" ref={username} />
      </fieldset>
      <fieldset>
        <Label>Password</Label>
        <input type="password" placeholder="Password" ref={password} />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
