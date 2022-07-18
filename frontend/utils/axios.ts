import axios from "axios";

const customAxios = (cookie?: string) => {
  const config = {
    withCredentials: true,
    headers: {},
  };
  // When we send request on server side the cookies
  // will not send along axio so we add the cookie
  // if there was any
  if (cookie) {
    config["headers"] = {
      Cookie: cookie,
    };
  }
  return axios.create(config);
};

export default customAxios;
