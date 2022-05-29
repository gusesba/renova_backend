const express = require("express");
const router = express.Router();

const {
  getAllSells,
  createSell,
  getSell,
  updateSell,
  deleteSell,
  getAllBorrows,
  createBorrow,
  createDonation,
  getAllDonations,
  getAllDevolutions,
  createDevolution,
  clientBuyIncome,
} = require("../controllers/sells");

router.route("/").get(getAllSells).post(createSell);
router.route("/borrows").get(getAllBorrows).post(createBorrow);
router.route("/donations").get(getAllDonations).post(createDonation);
router.route("/devolutions").get(getAllDevolutions).post(createDevolution);
router.route("/:id").get(getSell).patch(updateSell).delete(deleteSell);
router.route("/:id/buyIncome").get(clientBuyIncome);

module.exports = router;
