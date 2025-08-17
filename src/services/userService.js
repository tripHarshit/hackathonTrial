import api from './api';

class UserService {
  // Update profile
  async updateProfile(name, address) {
    const response = await api.put('/auth/update-profile', {
      name,
      address
    });
    return response.data;
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  }

  // Health check
  async healthCheck() {
    const response = await api.get('/health');
    return response.data;
  }
}

export default new UserService();
