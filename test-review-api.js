const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testReviewAPI() {
  try {
    console.log('Testing Review API...');
    
    // Test getting reviews for a movie (should work without auth)
    console.log('\n1. Testing GET /api/reviews/123');
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/123`);
      console.log('✅ GET reviews successful:', response.status);
      console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ GET reviews failed:', error.response?.status, error.response?.data?.message || error.message);
    }
    
    // Test server health
    console.log('\n2. Testing server health');
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      console.log('✅ Server health check successful:', response.status);
    } catch (error) {
      console.log('❌ Server health check failed:', error.code || error.message);
      console.log('Make sure backend server is running on port 5000');
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testReviewAPI();
