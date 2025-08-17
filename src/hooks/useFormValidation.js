import { useState, useCallback } from 'react';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '../utils/validation';

export const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    let error = '';
    
    switch (name) {
      case 'email':
        if (values[name] && !validateEmail(values[name])) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (values[name]) {
          const passwordValidation = validatePassword(values[name]);
          if (!passwordValidation.isValid) {
            error = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
          }
        }
        break;
      case 'confirmPassword':
        if (values[name] && values.password && !validatePasswordMatch(values.password, values[name])) {
          error = 'Passwords do not match';
        }
        break;
      case 'fullName':
        if (values[name] && !validateName(values[name])) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      default:
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [values]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(values.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(values.password).isValid) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (values.confirmPassword && !validatePasswordMatch(values.password, values.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (values.fullName && !validateName(values.fullName)) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
};
