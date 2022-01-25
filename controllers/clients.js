const Client = require("../models/Client");

const asyncWrapper = require("../middleware/async");

// GET ALL Clients
const getAllClients = async (req, res) => {
  const clients = await Client.findAll();

  return res.json(clients);
};

// GET ONE Client
const getClient = asyncWrapper(async (req, res) => {});

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
      return res.status(404).json({
        sucess: false,
        error: "No client",
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
      console.log("teste");
      res.status(404).json({ sucess: false, error: "Client not found" });
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
