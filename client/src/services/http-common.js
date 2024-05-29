import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
console.log("Server URL:", serverUrl);
if (!serverUrl) {
  throw new Error("SERVER_URL is not defined in the .env file");
}

export const http =  axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-type": "application/json",
  }
});

export default http;