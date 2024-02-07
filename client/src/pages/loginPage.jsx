import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function LoginPage() {
  return (
    <div>
      <div>
        <h1>Login and Signup</h1>
        <h2>LOGIN</h2>
        <LoginForm />
      </div>

      <div>
        <h2>Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
}

export default LoginPage;
