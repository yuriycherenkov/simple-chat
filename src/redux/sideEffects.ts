import axios from 'axios';

const fetchData = (config: any) => {
  return axios(config);
};

export {
  fetchData
};
