const express = require("express");
const router = express.Router();

const {
  getAllSells,
  createSell,
  getSell,
  updateSell,
  deleteSell,
  countProductByPeriod,
} = require("../controllers/sells");

router.route("/").get(getAllSells).post(createSell);
router.route("/:id").get(getSell).patch(updateSell).delete(deleteSell);
router.route("/count/count").get(countProductByPeriod);

module.exports = router;
