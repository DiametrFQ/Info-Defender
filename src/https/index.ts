import axios from "axios";

const $host = axios.create({
  baseURL: "http://linkToBackend",
});

export { $host };
