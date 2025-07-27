const http = require('http');

const API_BASE_URL = 'http://localhost:5000';

// Simple HTTP request function
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsedData });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function runDebugTests() {
  console.log('🔍 === DEBUGGING REVIEW SYSTEM ===\n');

  try {
    // Test 1: Check server health
    console.log('1. Testing server health...');
    try {
      const healthOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/health',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const healthResponse = await makeRequest(healthOptions);
      console.log('✅ Server health:', healthResponse.status, healthResponse.data.message);
    } catch (error) {
      console.log('❌ Server health failed:', error.message);
      console.log('💡 Make sure the backend server is running on port 5000');
      return;
    }

    // Test 2: Test basic review endpoint
    console.log('\n2. Testing GET reviews endpoint...');
    try {
      const reviewsOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/reviews/123456',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const reviewsResponse = await makeRequest(reviewsOptions);
      console.log('✅ GET reviews successful:', reviewsResponse.status);
      console.log('Response:', reviewsResponse.data);
    } catch (error) {
      console.log('❌ GET reviews failed:', error.message);
    }

    // Test 3: Test POST endpoint (without auth)
    console.log('\n3. Testing POST review endpoint (without auth - should fail)...');
    try {
      const postOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/reviews',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const testReview = {
        movieId: '123456',
        rating: 5,
        comment: 'Test review',
        title: 'Test',
        movieTitle: 'Test Movie'
      };
      
      const postResponse = await makeRequest(postOptions, testReview);
      console.log('Response status:', postResponse.status);
      console.log('Response:', postResponse.data);
      
      if (postResponse.status === 401) {
        console.log('✅ Correctly rejected request without auth');
      } else {
        console.log('⚠️ Unexpected response');
      }
    } catch (error) {
      console.log('❌ POST request failed:', error.message);
    }

    console.log('\n📊 Debug tests completed!');
    console.log('\n💡 Next steps:');
    console.log('1. Try submitting a review from the frontend');
    console.log('2. Watch the backend terminal for detailed logs');
    console.log('3. Check browser network tab for failed requests');

  } catch (error) {
    console.error('Debug test failed:', error.message);
  }
}

runDebugTests();
