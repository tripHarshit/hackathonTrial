export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  if (error.response?.status === 401) {
    return 'Authentication failed. Please login again.';
  }
  
  if (error.response?.status === 403) {
    return 'Access denied. You do not have permission to perform this action.';
  }
  
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }
  
  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export const isNetworkError = (error) => {
  return error.code === 'NETWORK_ERROR' || !error.response;
};

export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};

export const isServerError = (error) => {
  return error.response?.status >= 500;
};
