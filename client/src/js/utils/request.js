import axios from "axios";

const request = {
  post: (path, formData) => axios.post(getURL(path), formData),
  update: (path, formData) => axios.put(getURL(path), formData),
  get: path => axios.get(getURL(path)),
  delete: path => axios.delete(getURL(path))
};

const getURL = path => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const url = isDevelopment
    ? "http://localhost:3000/api/v1"
    : "https://senditkingsley.herokuapp.com/api/v1";
  return url.concat(`${path}`);
};
export default request;
