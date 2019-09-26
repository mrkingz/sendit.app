import axios from "axios";

const request = {
  post: (path, formData, configs = {}) =>
    axios.post(getURL(path), formData, configs),
  update: (path, formData, configs = {}) =>
    axios.put(getURL(path), formData, configs),
  get: path => axios.get(getURL(path)),
  delete: path => axios.delete(getURL(path))
};
const getURL = path => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const url = isDevelopment
    ? "http://localhost:3000/api/v1"
    : "https://sendit-app-api.herokuapp.com/api/v1";
  return url.concat(`${path}`);
};
export default request;
