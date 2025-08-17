const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'TestPass123',
  confirmPassword: 'TestPass123'
};

let authToken = '';

// Test functions
async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Health check passed:', data.message);
    return true;
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return false;
  }
}

async function testSignup() {
  console.log('\n🔍 Testing signup...');
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    
    if (data.success) {
      authToken = data.token;
      console.log('✅ Signup successful:', data.data.user.email);
      return true;
    } else {
      console.log('❌ Signup failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Signup error:', error.message);
    return false;
  }
}

async function testSignin() {
  console.log('\n🔍 Testing signin...');
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      authToken = data.token;
      console.log('✅ Signin successful:', data.data.user.email);
      return true;
    } else {
      console.log('❌ Signin failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Signin error:', error.message);
    return false;
  }
}

async function testGetProfile() {
  console.log('\n🔍 Testing get profile...');
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Get profile successful:', data.data.user.name);
      return true;
    } else {
      console.log('❌ Get profile failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Get profile error:', error.message);
    return false;
  }
}

async function testUpdateProfile() {
  console.log('\n🔍 Testing update profile...');
  try {
    const response = await fetch(`${BASE_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        name: 'Updated Test User'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Update profile successful:', data.data.user.name);
      return true;
    } else {
      console.log('❌ Update profile failed:', data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Update profile error:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  const tests = [
    testHealthCheck,
    testSignup,
    testSignin,
    testGetProfile,
    testUpdateProfile
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const result = await test();
    if (result) passed++;
  }
  
  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Your backend is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check your setup.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testSignup,
  testSignin,
  testGetProfile,
  testUpdateProfile,
  runTests
};
