import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend's URL
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
export const fetchTransactions = (month, search = '', page = 1, perPage = 10) => {
  return axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, search, page, perPage },
  });
};

export const fetchStatistics = (month) => {
  return axios.get(`${API_BASE_URL}/statistics`, {
    params: { month },
  });
};

export const fetchBarChart = (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart`, {
    params: { month },
  });
};

export const fetchPieChart = (month) => {
  return axios.get(`${API_BASE_URL}/pie-chart`, {
    params: { month },
  });
};

export const fetchCombinedData = (month, search = '', page = 1, perPage = 10) => {
  return axios.get(`${API_BASE_URL}/combined-data`, {
    params: { month, search, page, perPage },
  });
};
