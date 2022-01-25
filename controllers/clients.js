const Client = require("../models/Client");

const asyncWrapper = require("../middleware/async");

// GET ALL Clients
const getAllClients = async (req, res) => {
  const clients = await Client.findAll();

  if (clients.length === 0) {
    return res.status(400).json({ sucess: false, error: "No clients found" });
  }
  return res.json(clients);
};

// GET ONE Client
const getClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const client = await Client.findByPk(id);

  if (!client) {
    res.status(400).json({ sucess: false, error: "Client not found" });
  }

  res.status(200).json(client);
});

// CREATE Client
const createClient = async (req, res) => {
  const { name, phone } = req.body;

  const client = await Client.create({ name, phone }).catch((err) =>
    console.log(err)
  );

  return res.json(client);
};

// DELETE Client
const deleteClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  await Client.destroy({
    where: { id },
  }).then((count) => {
    if (!count) {
      return res.status(400).json({
        sucess: false,
        error: "Client not found",
      });
    }
    res.status(200).json({ sucess: true });
  });
});

// UPDATE Client
const updateClient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { phone, name } = req.body;

  await Client.update({ phone, name }, { where: { id } }).then((result) => {
    if (!result[0]) {
      res.status(400).json({ sucess: false, error: "Client not found" });
    }
    res.status(200).json({ sucess: true });
  });
});

module.exports = {
  getAllClients,
  getClient,
  createClient,
  deleteClient,
  updateClient,
};
