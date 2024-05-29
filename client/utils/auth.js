import Cookies from "js-cookie";
import axios from "axios";

export const setToken = (token) => {
  Cookies.set("token", token, { expires: 30 });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeToken = () => {
  Cookies.remove("token");
  delete axios.defaults.headers.common["Authorization"];
};

export const getToken = () => {
  console.log("called");
  return Cookies.get("token");
};
