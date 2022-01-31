const express = require("express");
const router = express.Router();

const {
  getAllSells,
  createSell,
  getSell,
  updateSell,
  deleteSell,
  countProductByPeriod,
  bruteIncomeByPeriod,
} = require("../controllers/sells");

router.route("/").get(getAllSells).post(createSell);
router.route("/:id").get(getSell).patch(updateSell).delete(deleteSell);
router.route("/financial/count").get(countProductByPeriod);
router.route("/financial/grossIncome").get(bruteIncomeByPeriod);

module.exports = router;
