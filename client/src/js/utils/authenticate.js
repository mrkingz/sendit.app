import decode from "jwt-decode";
import setAthorizationToken from "@utils/setAuthorization";

const authenticate = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const currentTime = Date.now();
    const tokenExp = decode(token).exp * 1000;
    if (currentTime < tokenExp) {
      setAthorizationToken(token);
      return true;
    }
  }
  return false;
};
export default authenticate;
