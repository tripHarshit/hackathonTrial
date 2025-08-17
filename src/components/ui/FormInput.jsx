import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Heart, Mail, User, Lock } from 'lucide-react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  className = '',
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(name);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getIcon = () => {
    switch (name) {
      case 'email':
        return <Mail className="w-5 h-5 text-baby-pink-400" />;
      case 'fullName':
        return <User className="w-5 h-5 text-baby-pink-400" />;
      case 'password':
      case 'confirmPassword':
        return <Lock className="w-5 h-5 text-baby-pink-400" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {getIcon()}
        </div>
        
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={props.disabled}
          className={`
            input-field pl-12 pr-4
            ${error && touched ? 'border-coral-300 ring-coral-300/50' : ''}
            ${!error && isFocused ? 'border-baby-pink-400 ring-baby-pink-400/50' : ''}
            ${showPasswordToggle ? 'pr-12' : ''}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />
        
        <label
          className={`
            absolute left-12 transition-all duration-300 pointer-events-none
            ${isFocused || value ? 'text-xs text-baby-pink-500 -top-2 bg-white px-2' : 'text-base text-baby-pink-600 top-3'}
          `}
        >
          {label} {required && <span className="text-coral-400">*</span>}
        </label>

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-baby-pink-400 hover:text-baby-pink-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-coral-500 text-sm flex items-center space-x-2"
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-1 h-1 bg-coral-400 rounded-full"
            />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;
