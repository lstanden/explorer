/**
 * Module dependencies.
 */

const { Router } = require("../modules");
const RuleController = require("../controllers/rule");

/**
 * Router to server routes for user
 */
const controller = new RuleController();
const router = new Router(controller);

router
  .get("/rules", controller.getRules)
  .get("/rules/generate", controller.generate);

module.exports = router;
