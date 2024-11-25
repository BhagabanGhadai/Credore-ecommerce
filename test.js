import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
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
  const url = 'http://localhost:8080/api/v1/products/cm3wv8ms9000anv701rolywtw';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtM3d2NDhicTAwMDAxOW9qdG92ZnFhaDIiLCJpYXQiOjE3MzI1NTA0MTEuMzkxLCJleHAiOjE3MzI1NTQwMTF9.utKU2-B0m5Twx2jBMcEIrFZz6jHGdxeOdBviyYfvHSQ';

  http.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  sleep(1);
}

// k6 run --out=cloud test.js