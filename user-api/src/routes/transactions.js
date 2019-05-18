/**
 * Module dependencies.
 */

const { Router } = require("../modules");

const TransactionsController = require("../controllers/transaction");

/**
 * Router to server routes for user
 */

const controller = new TransactionsController();
const router = new Router(controller);

router
  .get("/transactions", controller.getCladeTransactions)
  .get("/transactions/:transactionId", controller.getCladeTransaction)
  .post("/transactions", controller.createCladeTransaction)
  // .put('/transactions/:transactionId', controller.updateCladeTransaction)
  .delete("/transactions/:transactionId", controller.destroyCladeTransaction);

module.exports = router;
