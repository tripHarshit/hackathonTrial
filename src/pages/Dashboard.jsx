import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Heart } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cute-gradient relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 backdrop-blur-md border-b border-baby-pink-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-3"
            >
              <Heart className="w-8 h-8 text-baby-pink-500" />
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 text-baby-pink-600 hover:text-baby-pink-700 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>{user?.name || 'User'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-baby-pink-500 text-white rounded-lg hover:bg-baby-pink-600 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-baby-pink-100 rounded-full mb-6"
          >
            <Heart className="w-12 h-12 text-baby-pink-500" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome back, {user?.name || 'User'}!
          </h2>
          
          <p className="text-baby-pink-600 text-lg mb-8">
            You're successfully authenticated and ready to explore.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-baby-pink-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-baby-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-baby-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
              <p className="text-baby-pink-600 text-sm">Manage your account settings and preferences</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-baby-pink-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-baby-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-baby-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
              <p className="text-baby-pink-600 text-sm">Customize your experience and security</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-baby-pink-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-baby-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-baby-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Favorites</h3>
              <p className="text-baby-pink-600 text-sm">View and manage your saved items</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
