import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const studentId = import.meta.env.VITE_STUDENT_ID;
const studentPassword = import.meta.env.VITE_STUDENT_PASSWORD;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const fetchToken = async () => {
  if (!apiBaseUrl) {
    throw new Error('Missing VITE_API_BASE_URL environment variable.');
  }
  if (!studentId || !studentPassword) {
    throw new Error('Missing student credentials in VITE_STUDENT_ID or VITE_STUDENT_PASSWORD.');
  }

  const response = await apiClient.post('/public/token', {
    studentId,
    password: studentPassword
  });

  if (!response?.data?.token) {
    throw new Error('Token response missing token.');
  }

  return response.data.token;
};

export const fetchDataset = async (token) => {
  if (!token) {
    throw new Error('Missing token for dataset request.');
  }

  const response = await apiClient.get('/private/data', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
