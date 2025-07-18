import axios from "axios";
import { API_BASE_URL } from "./constant";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
}); 