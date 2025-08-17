import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveBackground from '../components/auth/InteractiveBackground';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Login:', values);
    setLoading(false);
  };

  const handleSignup = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Signup:', values);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cute-gradient relative overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-center mb-8"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-5xl font-bold mb-4 text-gray-800"
            >
              <span className="gradient-text">Modern Authentication System</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-baby-pink-600 text-xl font-medium"
            >
              Secure, simple, and elegant email authentication
            </motion.p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex justify-center mb-8"
          >
            <div className="glass-effect rounded-2xl p-1 backdrop-blur-sm">
              <div className="flex space-x-1">
                {['login', 'signup'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-6 py-3 rounded-xl font-semibold transition-all duration-300
                      ${activeTab === tab
                        ? 'bg-pink-button text-white shadow-lg'
                        : 'text-baby-pink-600 hover:text-baby-pink-700'
                      }
                    `}
                  >
                    {tab === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Forms Container */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="form-container"
          >
            {activeTab === 'login' ? (
              <LoginForm onSubmit={handleLogin} loading={loading} />
            ) : (
              <SignupForm onSubmit={handleSignup} loading={loading} />
            )}
          </motion.div>

          {/* Features Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Interactive Background',
                description: 'Mouse-following gradients and floating particles',
                icon: '✨',
                color: 'from-baby-pink-200 to-peach-200',
              },
              {
                title: 'Smooth Animations',
                description: 'Framer Motion powered transitions and effects',
                icon: '🎭',
                color: 'from-lavender-200 to-baby-pink-200',
              },
              {
                title: 'Form Validation',
                description: 'Real-time validation with beautiful feedback',
                icon: '✅',
                color: 'from-mint-200 to-baby-pink-200',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: 'easeOut' }}
                className="glass-effect rounded-2xl p-6 text-center backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-baby-pink-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;
