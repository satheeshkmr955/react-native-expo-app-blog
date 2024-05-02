import axios from "axios";

export const axiosFetcher = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
