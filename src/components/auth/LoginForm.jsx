import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Heart } from 'lucide-react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useAuthContext } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const LoginForm = ({ onSubmit, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setApiLoading(true);
      setError('');
      
      try {
        await login(values.email, values.password);
        setShowSuccess(true);
        toast.success('Welcome back!', {
          style: {
            background: '#fce7f3',
            color: '#ec4899',
          },
        });
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/dashboard');
        }, 1000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        setError(errorMessage);
        toast.error('Login failed. Please try again!');
      } finally {
        setApiLoading(false);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-baby-pink-600 text-sm">
          Sign in to your account to continue
        </p>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-4 animate-shake"
        >
          {error}
        </motion.div>
      )}

      {/* Email Input */}
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        required
        disabled={apiLoading}
      />

      {/* Password Input */}
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
        required
        showPasswordToggle
        disabled={apiLoading}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div className={`
              w-5 h-5 border-2 rounded transition-all duration-200
              ${rememberMe 
                ? 'border-baby-pink-500 bg-baby-pink-500' 
                : 'border-baby-pink-300 group-hover:border-baby-pink-400'
              }
            `}>
              {rememberMe && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Heart className="w-3 h-3 text-white fill-current" />
                </motion.div>
              )}
            </div>
          </div>
          <span className="text-sm text-baby-pink-700 group-hover:text-baby-pink-800 transition-colors duration-200 font-medium">
            Remember me
          </span>
        </label>
        
        <Link
          to="/forgot-password"
          className="text-sm cute-link hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={apiLoading}
        className="mt-8"
        disabled={apiLoading}
      >
        {showSuccess ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span>Welcome back!</span>
          </motion.div>
        ) : (
          'Sign In'
        )}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center pt-4">
        <span className="text-baby-pink-600 font-medium">New user? </span>
        <Link
          to="/signup"
          className="cute-link font-semibold hover:underline"
        >
          Create an account
        </Link>
      </div>
    </motion.form>
  );
};

export default LoginForm;
