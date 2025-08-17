import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, AlertCircle, Heart, Sparkles } from 'lucide-react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from '../../utils/validation';

const SignupForm = ({ onSubmit, loading = false }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Memoize password validation to prevent unnecessary recalculations
  const passwordValidation = useMemo(() => {
    if (!values.password) return null;
    return validatePassword(values.password);
  }, [values.password]);

  const passwordStrengthColor = useMemo(() => {
    if (!passwordValidation) return '';
    return getPasswordStrengthColor(passwordValidation.score);
  }, [passwordValidation]);

  const passwordStrengthText = useMemo(() => {
    if (!passwordValidation) return '';
    return getPasswordStrengthText(passwordValidation.score);
  }, [passwordValidation]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    if (validateForm()) {
      try {
        await onSubmit(values);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  }, [termsAccepted, validateForm, onSubmit, values]);

  const PasswordStrengthIndicator = useCallback(() => {
    if (!values.password) return null;

    const getHeartEmoji = (score) => {
      if (score <= 2) return '🤍';
      if (score <= 3) return '🩷';
      if (score <= 4) return '💗';
      return '💖';
    };

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="mt-3 space-y-3 p-3 bg-baby-pink-50 rounded-2xl border border-baby-pink-200"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-baby-pink-700 font-medium">Password strength:</span>
          <motion.span 
            key={passwordValidation?.score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`font-semibold flex items-center space-x-1 ${passwordStrengthColor}`}
          >
            <span>{getHeartEmoji(passwordValidation?.score || 0)}</span>
            <span>{passwordStrengthText}</span>
          </motion.span>
        </div>
        
        <div className="w-full bg-white rounded-full h-2 border border-baby-pink-200 overflow-hidden">
          <motion.div
            key={passwordValidation?.score}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              passwordValidation?.score <= 2 ? 'bg-coral-300' :
              passwordValidation?.score <= 3 ? 'bg-peach-300' :
              passwordValidation?.score <= 4 ? 'bg-lavender-300' : 'bg-mint-300'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${((passwordValidation?.score || 0) / 5) * 100}%` }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          {passwordValidation && Object.entries(passwordValidation.strength).map(([key, isValid]) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center space-x-2"
            >
              {isValid ? (
                <Check className="w-3 h-3 text-mint-500" />
              ) : (
                <AlertCircle className="w-3 h-3 text-coral-400" />
              )}
              <span className={isValid ? 'text-mint-600' : 'text-coral-500'}>
                {key === 'minLength' && '8+ characters'}
                {key === 'hasUpperCase' && 'Uppercase'}
                {key === 'hasLowerCase' && 'Lowercase'}
                {key === 'hasNumbers' && 'Numbers'}
                {key === 'hasSpecialChar' && 'Special chars'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }, [values.password, passwordValidation, passwordStrengthColor, passwordStrengthText]);

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
          Create Account
        </h2>
        <p className="text-baby-pink-600 text-sm">
          Join us and start your journey
        </p>
      </motion.div>

      {/* Full Name Input */}
      <FormInput
        label="Full Name"
        type="text"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fullName}
        touched={touched.fullName}
        required
      />

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
      />

      {/* Password Input */}
      <div>
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
        />
        <AnimatePresence mode="wait">
          <PasswordStrengthIndicator key={values.password} />
        </AnimatePresence>
      </div>

      {/* Confirm Password Input */}
      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        required
        showPasswordToggle
      />

      {/* Terms & Conditions */}
      <label className="flex items-start space-x-3 cursor-pointer group">
        <div className="relative mt-1">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="sr-only"
          />
          <div className={`
            w-5 h-5 border-2 rounded transition-all duration-200
            ${termsAccepted 
              ? 'border-baby-pink-500 bg-baby-pink-500' 
              : 'border-baby-pink-300 group-hover:border-baby-pink-400'
            }
          `}>
            {termsAccepted && (
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
        <div className="text-sm text-baby-pink-700 group-hover:text-baby-pink-800 transition-colors duration-200">
          I agree to the{' '}
          <Link
            to="/terms"
            className="cute-link underline"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy"
            className="cute-link underline"
          >
            Privacy Policy
          </Link>
        </div>
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
        className="mt-8"
      >
        {showSuccess ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Account created!</span>
          </motion.div>
        ) : (
          'Create Account'
        )}
      </Button>

      {/* Login Link */}
      <div className="text-center pt-4">
        <span className="text-baby-pink-600 font-medium">Already have an account? </span>
        <Link
          to="/login"
          className="cute-link font-semibold hover:underline"
        >
          Sign in here
        </Link>
      </div>
    </motion.form>
  );
};

export default SignupForm;
