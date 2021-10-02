import axios from "axios";
import * as RequestInterceptor from "@network/interceptors/request";
import * as ResponseInterceptor from "@network/interceptors/response";

const API_BASE_URL = process.env.API_BASE_URL + 'api/';

const getInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
  });
  instance.interceptors.request.use(
    RequestInterceptor.addAccessToken,
    RequestInterceptor.onRejected
  );
  instance.interceptors.response.use(
    ResponseInterceptor.onFullfilled,
    ResponseInterceptor.onRejected
  );
  return instance;
};

export const apiClient = getInstance(API_BASE_URL);