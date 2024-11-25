import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '1s',
  cloud: {
    // Project: Default project
    projectID: 3726476,
    // Test runs with the same name groups test runs together.
    name: 'Test (25/11/2024-20:24:15)'
  },
//   thresholds: {
//     http_req_duration: ['p(99)<300'],
//     http_req_failed: ['rate<0.01']
//   }
};

export default function() {
  const payload = JSON.stringify({
    email: "demo@admin.in",
    password: "Admin@123"
  });

  http.post('http://localhost:8080/api/v1/users/login', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  sleep(1);
}

// k6 run --out=cloud test.js