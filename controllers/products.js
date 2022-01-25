const Product = require("../models/Product");
const Client = require("../models/Client");

const asyncWrapper = require("../middleware/async");

// GET ALL PRODUCTS
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.findAll({
    include: { association: "provider" },
  });

  return res.json(products);
});

// GET ONE PRODUCT
const getProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  return res.json(product);
});

// CREATE PRODUCT
const createProduct = async (req, res) => {
  const { providerId, price, type, brand, size, description, color } = req.body;

  const provider = await Client.findByPk(providerId);

  if (!provider) {
    return res.status(400).json({ error: "User not found" });
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
const deleteProduct = asyncWrapper(async (req, res) => {});

// UPDATE PRODUCT
const updateProduct = asyncWrapper(async (req, res) => {});

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
