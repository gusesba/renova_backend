const Sell = require("../models/Sell");
const Product = require("../models/Product");
const Client = require("../models/Client");
const sequelize = require("sequelize");
const moment = require("moment");

const asyncWrapper = require("../middleware/async");

// GET ALL Sells
const getAllSells = asyncWrapper(async (req, res) => {
  const sells = await Sell.findAll({
    include: [
      { association: "product", include: { association: "provider" } },
      { association: "buyer" },
    ],
    where: { type: "sell" },
  });

  if (sells.length === 0) {
    return res.status(400).json({ sucess: false, error: "No sells found" });
  }
  return res.json(sells);
});

// GET ALL Borrows
const getAllBorrows = asyncWrapper(async (req, res) => {
  const borrows = await Sell.findAll({
    include: [
      { association: "product", include: { association: "provider" } },
      { association: "buyer" },
    ],
    where: { type: "borrow" },
  });

  if (borrows.length === 0) {
    return res.status(400).json({ sucess: false, error: "No borrows found" });
  }
  return res.json(borrows);
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
    return res.json({ sucess: false, error: "Buyer not found" });
  }
  if (!product) {
    return res.json({ sucess: false, error: "Product not found" });
  }

  const sell = await Sell.create({ buyerId, productId, type: "sell" }).catch(
    (err) => {
      res.json({ error: err.name });
    }
  );
  console.log("teste-----------------------------------------");
  return res.json(sell);
};

// CREATE Borrow
const createBorrow = async (req, res) => {
  const { buyerId, productId } = req.body;

  const buyer = await Client.findByPk(buyerId);
  const product = await Product.findByPk(productId);

  if (!buyer) {
    res.status(400).json({ sucess: false, error: "Buyer not found" });
  }
  if (!product) {
    res.status(400).json({ sucess: false, error: "Product not found" });
  }

  const borrow = await Sell.create({
    buyerId,
    productId,
    type: "borrow",
  }).catch((err) => console.log(err));

  return res.json(borrow);
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
        [sequelize.Op.between]: [dateInit, dateFinal],
      },
    },
  }).then(function (count) {
    res.status(200).json({ count });
  });
});

// SELECT GROSS INCOME BY DATE
const bruteIncomeByPeriod = asyncWrapper(async (req, res) => {
  const { dateInit, dateFinal } = req.body;

  const dateI = moment(dateInit).format("YYYY-MM-DD HH:mm:ss");
  const dateF = moment(dateFinal).format("YYYY-MM-DD HH:mm:ss");

  const grossIncome = await Product.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("price")), "grossIncome"]],
    where: {
      id: {
        [sequelize.Op.in]: [
          sequelize.literal(
            `SELECT DISTINCT "productId" FROM sells WHERE "createdAt" BETWEEN '${dateI}' AND '${dateF}'`
          ),
        ],
      },
    },
  }).catch((err) => console.log(err));

  res.status(200).json({ grossIncome });
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
  bruteIncomeByPeriod,
  createBorrow,
  getAllBorrows,
};
