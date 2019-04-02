import decode from "jwt-decode";

const authenticate = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const currentTime = Date.now();
    const tokenExp = decode(token).exp * 1000;
    return currentTime < tokenExp;
  }
  return false;
};
export default authenticate;
