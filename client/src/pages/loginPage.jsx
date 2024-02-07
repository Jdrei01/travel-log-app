import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../styles/loginPage.css'
function LoginPage() {
  return (
    <div className='log-in-page'>
      <div>
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
