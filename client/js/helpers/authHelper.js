import axios from 'axios';

const API_URI = process.env.API_URI || 'http://localhost:3000/';
const TOKEN_NAME = 'gib_token';
const axiosInstance = axios.create({
  baseURL: API_URI
});

// at sign in, api server requires a username and password
// tokenName is used to set jwt in local storage.
export async function signIn({ username, password }) {
  const response = await axiosInstance.post('signin', { username, password });
  const gibToken = response.data.token;

  localStorage.setItem(TOKEN_NAME, gibToken);
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${gibToken}`;
  return gibToken;
}

export async function getAllEmployees() {
  const response = await axiosInstance.get('api/employee');
  return response.data;
}

// make the assumption that if the user has the token
// that they are logged in
// the local storage is only avaiable on the domain so this is safe enough for our purposes
export function isLoggedIn(tokenName = TOKEN_NAME) {
  return localStorage.getItem(tokenName);
}

export function signOut(tokenName = TOKEN_NAME) {
  return localStorage.removeItem(tokenName);
}
