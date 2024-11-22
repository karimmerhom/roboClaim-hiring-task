import axios from "./axios-default";
import { globalErrorHandler } from "./api-helper";
import Cookies from "js-cookie";

const baseUrl = "auth/";

export function saveUserInfo(data) {
    localStorage.setItem("user_info", JSON.stringify(data));
  }
  
export function getUserInfo() {
    const info = JSON.parse(
      localStorage.getItem("user_info")
    );
    return info || {};
  }

export function setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }

  export function isLoggedIn() {
    return !!localStorage.getItem("access_token");
  }

  export function getAccessToken() {
    return localStorage.getItem("access_token");
  }

  export async function saveTokens(accessToken) {
    Cookies.set("access_token", accessToken, { path: "/", secure: false, expires: 7 });
    localStorage.setItem("access_token", accessToken);
  }

  export function signOut() {
    Cookies.remove("access_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    window.location.href = "/auth/login";
  }

export async function credentialsLogin(credentials) {
    try {
        let response = await axios.post(baseUrl + "login", credentials);
        let payload = response.data
        saveTokens(payload.access_token)
        saveUserInfo(payload.user)
        setAuthToken(payload.access_token)
        window.location.href = "/portal";
        return response
    } catch (err) {
        return globalErrorHandler(err);
    }
  }