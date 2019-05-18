const express = require("express");

module.exports = class Router extends express.Router {
  constructor(controller) {
    super();
    this._controller = controller.name;
  }

  get controller() {
    return this._controller;
  }

  set controller(controller) {
    this._controller = controller;
  }
};
