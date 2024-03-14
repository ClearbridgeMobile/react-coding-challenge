import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  headers: {
    // 'Authorization': 'Basic ' + encoded,
    "Content-Type": "application/json",
  },
});
