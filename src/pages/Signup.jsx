import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful signup
    console.log('Signup successful:', values);
    
    // In a real app, you would:
    // 1. Call your signup API
    // 2. Send verification email
    // 3. Redirect to login or verification page
    
    setLoading(false);
    
    // For demo purposes, show success message
    // navigate('/login');
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey"
    >
      <SignupForm
        onSubmit={handleSignup}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default Signup;
