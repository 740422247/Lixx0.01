import http from "./http";
import api from "./address";

export default {
  action: (url, params) => http.post(api.baseUrl + '/' +url, params)
};
