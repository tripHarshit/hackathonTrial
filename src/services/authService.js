import api from './api';

class AuthService {
  // Signup API call
  async signup(userData) {
    const response = await api.post('/auth/signup', {
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  // Signin API call
  async signin(email, password) {
    const response = await api.post('/auth/signin', {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // Check authentication
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
