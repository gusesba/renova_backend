const express = require("express");
const router = express.Router();

const {
  getAllClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
  getClientIncome,
} = require("../controllers/clients");

router.route("/").get(getAllClients).post(createClient);
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);
router.route("/:id/income").get(getClientIncome);

module.exports = router;
