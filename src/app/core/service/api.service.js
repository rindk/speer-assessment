import { environment } from '../config/environment';
import axios from 'axios';

export class ApiService {
  constructor() {
    // Init axiosInstance
    this.axiosInstance = axios.create({
      baseURL: environment.apiBaseUrl,
      // Common header
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._setInterceptors();
  }

  createURL(uri) {
    let paramsUrl;
    if (typeof uri[uri.length - 1] !== 'string') {
      paramsUrl = uri.pop();
      let url = uri.join('/');
      Object.keys(paramsUrl).forEach((x) => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join('/');
    }
  }

  get(uri, params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), {
        params,
        ...moreConfigs,
      });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri, data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(
        this.createURL(uri),
        data,
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(
        this.createURL(uri),
        moreConfigs
      );
      this._handleRespond(request, resolve, reject);
    });
  }

  _handleRespond(request, resolve, reject) {
    return request
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  }

  _setInterceptors() {
    this.axiosInstance.interceptors.request.use((request) =>
      this.authHelper.setAuthHeader(request)
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => this._handleError(error)
    );
  }

  async _handleError(error) {
    // Detect refresh Token
    if (error.isAxiosError && error.response?.status === 401) {
      const originalRequest = error.config;
      const req = await this.authHelper.handleRefreshToken(originalRequest);
      return this.axiosInstance(req);
    }

    // Make error model before promise
    if (error.isAxiosError && error.response) {
      // Axios error
      return Promise.reject(error);
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject({});
    }
  }
}
