import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
