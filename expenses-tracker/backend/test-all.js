const http = require('http');

function makeRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: responseData
        });
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

async function test() {
  try {
    console.log('=== Testing Backend API ===\n');

    // Test 1: Register new user
    console.log('1. Testing registration...');
    const regData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123'
    };
    const regResult = await makeRequest('/api/auth/register', 'POST', regData);
    console.log('Status:', regResult.status);
    console.log('Response:', regResult.data);
    console.log('');

    // Test 2: Login with same credentials
    console.log('2. Testing login with registered credentials...');
    const loginData = {
      email: 'john@example.com',
      password: 'SecurePass123'
    };
    const loginResult = await makeRequest('/api/auth/login', 'POST', loginData);
    console.log('Status:', loginResult.status);
    console.log('Response:', loginResult.data);
    console.log('');

    // Test 3: Try invalid password
    console.log('3. Testing login with wrong password...');
    const wrongLoginData = {
      email: 'john@example.com',
      password: 'WrongPassword'
    };
    const wrongLoginResult = await makeRequest('/api/auth/login', 'POST', wrongLoginData);
    console.log('Status:', wrongLoginResult.status);
    console.log('Response:', wrongLoginResult.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
