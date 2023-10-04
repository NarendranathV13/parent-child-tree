import axios from 'axios';
const api = axios.create({
    baseURL: `https://651be895194f77f2a5af1087.mockapi.io`,
});
  const GetAxiosData = (apiUrl) => {
    return api.get(apiUrl);
  }
export { GetAxiosData};