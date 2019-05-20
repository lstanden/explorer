import "isomorphic-fetch";
import { adminApiHost, publicApiHost } from "@src/config";
import Auth from "@src/components/Auth";

export default class Request {
  static endPoints = {
    admin: adminApiHost,
    public: publicApiHost
  };

  constructor(url, method, params, endPoint) {
    this._endPoint = endPoint || Request.endPoints.admin;

    this._params = params || {};

    this._config = {};

    this._url = this.localUrl(url);

    this._method = method;

    let isMultipart = false;

    Object.keys(this._params).forEach(
      k => (isMultipart = this._params[k] instanceof File)
    );

    if (isMultipart) {
      this._payload = new FormData();
      Object.keys(this._params).forEach(k =>
        this._payload.append(k, this._params[k])
      );
      this._config.headers = {};
    } else if (
      Object.keys(this._params).length !== 0 &&
      JSON.stringify(this._params) !== JSON.stringify({})
    ) {
      this._payload = JSON.stringify(this._params);
      this._config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
    } else {
      this._payload = JSON.stringify({});
      this._config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
    }

    if (Auth.isUserAuthenticated()) {
      this._config.headers.Authorization = `bearer ${Auth.getToken()}`;
    }

    this._config.method = this._method;
    this._config.body = this._payload;
    if (this._config.method === "GET") {
      delete this._config.body;
    }
  }

  localUrl(url) {
    return new URL(url, this._endpoint || publicApiHost).toString();
  }

  async fetch() {
    const response = await fetch(this._url, this._config);
    const json = await response.json();
    return json;
  }
}
