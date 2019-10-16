import Vue from 'vue'
import axios from "axios";
import qs from "qs";

// axios 配置
const BASE_URL = "http://localhost";
const TEST_URL = "http://localhost";

const URL = process.env.NODE_ENV === "development" ? TEST_URL : BASE_URL;

// 发送一般请求
const http = axios.create({
  timeout: 5000,
  baseURL: URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  }
});

const formConfig = {
  timeout: 60000,
  baseURL: URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
};


export default {
  host() {
    return URL;
  },
  get(url, params = {}) {
    return new Promise (async (resolve, reject) => { // eslint-disable-line
      try {
        const data = await http.get(url, {params})
        resolve (data) // eslint-disable-line
      } catch (err) {
        // notice('请求超时', 1.5, 'bottom')
      }
    })
  },
  post(url, params = {}) {

    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.post(url, params)
        const code = Number(data.data.errorCode)
        if (code === 0) {
          resolve(data)
        } else if (code > 0) {
          // 报错 data.data.errorMessage
        } else if (code < 0) {
          // 重新登陆 清除登陆信息 location.reload()
          // window.location.reload()
        } else {
          resolve(data)
        }
      } catch (err) {
        // notice('请求超时', 1.5, 'bottom')
      }
    })
  }
};
