import axios from "axios";

const customAxios = (coockie?: string) => {
  const config = {
    withCredentials: true,
    headers: {},
  };
  // When we send request on server side the cookies
  // will not send along axios by default so we add the coockie
  // if there was any
  if (coockie) {
    config["headers"] = {
      Cookie: coockie,
    };
  }
  return axios.create(config);
};

export default customAxios;
