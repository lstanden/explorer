/**
 * Module dependencies.
 */

const { Router } = require("../modules");
const CladeController = require("../controllers/clade");

/**
 * Router to server routes for user
 */
const controller = new CladeController();
const router = new Router(controller);

router
  .get("/clades/tree", controller.getClades)
  .get("/clades/tree/:id/", controller.getClades)
  .get("/clades/tree/depth/:depth", controller.getClades)
  .get("/clades/tree/:id/depth/:depth", controller.getClades)
  .get("/clades/:id", controller.getCladeById)
  .post("/clades/enrich", controller.enrichClades)
  .post("/clades/search", controller.searchForClades);

module.exports = router;
