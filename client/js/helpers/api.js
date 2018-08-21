import axios from 'axios';
const API_URL = process.env.API_URL || 'http://localhost:3000/';

export async function getProducts() {
  const response = await axios.get(`${API_URL}/api/product`);
  return response.data;
}
