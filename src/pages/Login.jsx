import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful login
    console.log('Login successful:', values);
    
    // In a real app, you would:
    // 1. Call your authentication API
    // 2. Store the token/user data
    // 3. Redirect to dashboard
    
    setLoading(false);
    
    // For demo purposes, show success message
    // navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </AuthLayout>
  );
};

export default Login;
