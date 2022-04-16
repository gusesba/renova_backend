const Product = require("../models/Product");
const Client = require("../models/Client");
const sequelize = require("sequelize");

const asyncWrapper = require("../middleware/async");

// GET ALL PRODUCTS
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.findAll({
    include: [{ association: "provider" }],
    where: {
      id: {
        [sequelize.Op.notIn]: [
          sequelize.literal(`SELECT DISTINCT "productId" FROM sells`),
        ],
      },
    },
  });

  if (products.length === 0) {
    return res.status(400).json({ sucess: false, error: "No Products Found" });
  }

  return res.status(200).json(products);
});

// GET ONE PRODUCT
const getProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: [{ association: "provider" }, { association: "sell" }],
  });

  if (!product) {
    return res.status(400).json({ sucess: false, error: "Product not found" });
  }

  return res.json(product);
});

// CREATE PRODUCT
const createProduct = async (req, res) => {
  const { providerId, price, type, brand, size, description, color } = req.body;

  const provider = await Client.findByPk(providerId);

  if (!provider) {
    return res.status(200).json({ error: "User not found" });
  }

  const product = await Product.create({
    price,
    type,
    brand,
    size,
    description,
    color,
    providerId,
  });

  return res.json(product);
};

// DELETE PRODUCT
const deleteProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  await Product.destroy({
    where: { id },
  }).then((count) => {
    if (!count) {
      return res.status(400).json({
        sucess: false,
        error: "Product not found",
      });
    }
    res.status(200).json({ sucess: true });
  });
});

// UPDATE PRODUCT
const updateProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { price, type, brand, size, description, color } = req.body;

  await Product.update(
    { price, type, brand, size, description, color },
    { where: { id } }
  ).then((result) => {
    if (!result[0]) {
      res.status(400).json({ sucess: false, error: "Product not found" });
    }
    res.status(200).json({ sucess: true });
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
