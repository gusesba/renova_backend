const Client = require("../models/Client");
const Product = require("../models/Product");
const sequelize = require("sequelize");
const asyncWrapper = require("../middleware/async");

// GET ALL Clients
const getAllClients = async (req, res) => {
  const clients = await Client.findAll({ order: [["id", "ASC"]] });

  if (clients.length === 0) {
    return res.status(400).json({ sucess: false, error: "No clients found" });
  }
  return res.json(clients);
};

// GET ONE Client
const getClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findByPk(id, {
    include: [
      {
        association: "product",
        include: [{ association: "sell" }, { association: "provider" }],
      },
      {
        association: "buyer",

        include: {
          association: "product",

          include: [{ association: "sell" }, { association: "provider" }],
        },
      },
    ],
  });

  const income = await Product.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("price")), "grossIncome"]],
    where: {
      id: {
        [sequelize.Op.in]: [
          sequelize.literal(`SELECT DISTINCT "productId" FROM sells`),
        ],
      },
      providerId: {
        [sequelize.Op.eq]: id,
      },
    },
  });

  const boughtValue = await Product.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("price")), "grossIncome"]],
    where: {
      id: {
        [sequelize.Op.in]: [
          sequelize.literal(
            `SELECT DISTINCT "productId" FROM sells WHERE "buyerId" = ${id}`
          ),
        ],
      },
    },
  });

  if (!client) {
    res.status(400).json({ sucess: false, error: "Client not found" });
  }

  res.status(200).json({ client, income, boughtValue });
});

// CREATE Client
const createClient = async (req, res) => {
  const { name, phone, number } = req.body;

  const client = await Client.create({ name, phone, number }).catch((err) =>
    console.log(err)
  );

  return res.json(client);
};

// DELETE Client
const deleteClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  await Client.destroy({
    where: { id },
  })
    .then((count) => {
      if (!count) {
        return res.json({
          sucess: false,
          error: "Client not found",
        });
      }
      res.status(200).json({ sucess: true });
    })
    .catch((err) => {
      res.json({ error: err.name });
    });
});

// UPDATE Client
const updateClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { phone, name, number } = req.body;

  await Client.update({ phone, name, number }, { where: { id } }).then(
    (result) => {
      if (!result[0]) {
        res.status(400).json({ sucess: false, error: "Client not found" });
      }
      res.status(200).json({ sucess: true });
    }
  );
});

module.exports = {
  getAllClients,
  getClient,
  createClient,
  deleteClient,
  updateClient,
};
