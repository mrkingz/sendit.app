import axios from "axios";

const setAthorizationToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["token"] = token;
  } else {
    delete axios.defaults.headers.common["token"];
  }
};

export default setAthorizationToken;
