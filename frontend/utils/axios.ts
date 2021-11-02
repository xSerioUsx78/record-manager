import axios from "axios";


const authAxios = (token: string | null) => {
  return axios.create({
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export default authAxios;