import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // Disable for dev local
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_API_ENDPOINT,
  },
});

export const handleError = (err) => {
  if (err.response) {
    if (err.response.data) console.error(err.response.data);
    if (err.response.status) console.error(err.response.status);

    if (err.response.data.message) {
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  }
  if (err.response?.status === 401) {
    if (err.response.data.err) alert(err.response.data.err);
  }
  if (err.response === 404) {
    console.info("page not found");
  } else if (err.request) {
    console.error(err.request);
    if (err.message) console.error(err.massage);
  } else {
    alert(err);
  }
};
