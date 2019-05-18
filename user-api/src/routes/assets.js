/**
 * Module dependencies.
 */

const multer = require("multer");
const { Router } = require("../modules");
const AssetController = require("../controllers/asset");

const upload = multer({ dest: "./build/temp" });

/**
 * Router to server routes for user
 */
const controller = new AssetController();
const router = new Router(controller);

router
  .post("/assets/temp", upload.single("cladeImg"), controller.uploadTempImage)
  .delete("/assets/clades/", controller.destroyCladeImage)
  .delete("/assets/temp/", controller.destroyTempImage);

module.exports = router;
