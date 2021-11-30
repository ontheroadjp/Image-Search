import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;

// https://qiita.com/Esfahan/items/1b41b64d0a605732a0dd
