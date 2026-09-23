import axios from 'axios';

// Define the base URL for the backend API
const API_URL = 'https://api.example.com';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_URL,
});

// Define a function to fetch data from the backend
const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Define a function to send data to the backend
const sendData = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error sending data to ${endpoint}:`, error);
    throw error;
  }
};

// Example usage of the fetchData and sendData functions
// const main = async () => {
//   try {
//     const data = await fetchData('/users');
//     console.log('Fetched data:', data);

//     const newData = await sendData('/users', { name: 'John Doe', email: 'john.doe@example.com' });
//     console.log('Sent data:', newData);
//   } catch (error) {
//     console.error('Error in main function:', error);
//   }
// };

// main();