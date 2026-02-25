import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://mtgo4aw4xf.execute-api.us-east-1.amazonaws.com",
});
