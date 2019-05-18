/**
 * Module dependencies.
 */

const { Router } = require("../modules");
const SettingsController = require("../controllers/setting");

/**
 * Router to serve routes for security
 */
const controller = new SettingsController();
const router = new Router(controller);

router
  .get("/settings", controller.getSettings)
  .patch("/settings", controller.saveSettings);

module.exports = router;
