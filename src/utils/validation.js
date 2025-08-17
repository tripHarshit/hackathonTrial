export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    strength: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    },
    score: [minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length,
  };
};

export const getPasswordStrengthColor = (score) => {
  if (score <= 2) return 'text-error';
  if (score <= 3) return 'text-warning';
  if (score <= 4) return 'text-yellow-400';
  return 'text-success';
};

export const getPasswordStrengthText = (score) => {
  if (score <= 2) return 'Weak';
  if (score <= 3) return 'Fair';
  if (score <= 4) return 'Good';
  return 'Strong';
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
