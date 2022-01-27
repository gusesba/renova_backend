const Sell = require("../models/Sell");
const Product = require("../models/Product");
const Client = require("../models/Client");
const { Op } = require("sequelize");

const asyncWrapper = require("../middleware/async");

// GET ALL Sells
const getAllSells = asyncWrapper(async (req, res) => {
  const sells = await Sell.findAll();

  if (sells.length === 0) {
    return res.status(400).json({ sucess: false, error: "No sells found" });
  }
  return res.json(sells);
});

// GET ONE Sell
const getSell = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const sell = await Sell.findByPk(id);

  if (!sell) {
    res.status(400).json({ sucess: false, error: "Sell not found" });
  }

  res.status(200).json(sell);
});

// CREATE Sell
const createSell = async (req, res) => {
  const { buyerId, productId } = req.body;

  const buyer = await Client.findByPk(buyerId);
  const product = await Product.findByPk(productId);

  if (!buyer) {
    res.status(400).json({ sucess: false, error: "Buyer not found" });
  }
  if (!product) {
    res.status(400).json({ sucess: false, error: "Product not found" });
  }

  const sell = await Sell.create({ buyerId, productId }).catch((err) =>
    console.log(err)
  );

  return res.json(sell);
};

// DELETE Sell
const deleteSell = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  await Sell.destroy({
    where: { id },
  }).then((count) => {
    if (!count) {
      return res.status(400).json({
        sucess: false,
        error: "Sell not found",
      });
    }
    res.status(200).json({ sucess: true });
  });
});

// SELECT COUNT BY DATE
const countProductByPeriod = asyncWrapper(async (req, res) => {
  const { dateInit, dateFinal } = req.body;
  Sell.count({
    distinct: true,
    col: "productId",
    where: {
      createdAt: {
        [Op.between]: [dateInit, dateFinal],
      },
    },
  }).then(function (count) {
    res.status(200).json({ count });
  });
});

// UPDATE Client
const updateSell = asyncWrapper(async (req, res) => {});

module.exports = {
  getAllSells,
  getSell,
  createSell,
  deleteSell,
  updateSell,
  countProductByPeriod,
};
