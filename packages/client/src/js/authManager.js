import { loadConfig } from "./loadConfig";

class AuthManager {
  constructor() {
    try {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token")?.trim() || this.token;

      if (!token) {
        throw new Error();
      }

      this.token = token;

      this.clearSearch();
    } catch {
      this.logout();
    }
  }

  get token() {
    return localStorage.getItem(AuthManager.TOKEN_NAME);
  }

  set token(value) {
    localStorage.setItem(AuthManager.TOKEN_NAME, value);
  }

  clearSearch() {
    const currentLocation = window.location.href;
    const cleanLocation = currentLocation.split("?")[0];
    window.history.replaceState({}, document.title, cleanLocation);
  }

  logout() {
    localStorage.removeItem(AuthManager.TOKEN_NAME);
    window.location = loadConfig().LOGIN_URI;
  }

  static TOKEN_NAME = "regaleToken";
}

let singleton = null;

export const getAuthManager = () => {
  if (!singleton) {
    singleton = new AuthManager();
  }

  return singleton;
};
