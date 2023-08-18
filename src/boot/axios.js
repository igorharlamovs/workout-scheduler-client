import { boot } from "quasar/wrappers";
import axios from "axios";
import { Cookies } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  axios.defaults.withCredentials = true;
  api.defaults.withCredentials = true;

  /**
   * Next we will register the CSRF Token as a common header with Axios so that
   * all outgoing HTTP requests automatically have it attached. This is just
   * a simple convenience so we don't have to attach every token manually.
   */

  let token = Cookies.get("csrfToken");

  if (token) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
    api.defaults.headers.common["X-CSRF-TOKEN"] = token;
  } else {
    console.error(
      "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
  }

  /**
   * Next we will register the CSRF Token as a common header with Axios so that
   * all outgoing HTTP requests automatically have it attached. This is just
   * a simple convenience so we don't have to attach every token manually.
   */

  let accessToken = Cookies.get("accessToken");

  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
