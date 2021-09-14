import { apiClient } from "@network/ApiInstance";
import Endpoints from "@network/Endpoint";

const { get, post, put } = apiClient;

export const login = (loginInfo: {}) => post(Endpoints.LOGIN, loginInfo);
export const signup = (signupInfo: {}) => post(Endpoints.SIGNUP, signupInfo);