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

  const client = await Client.create({ name, phone });

  return res.json(client);
};

// DELETE Client
const deleteClient = asyncWrapper(async (req, res) => {});

// UPDATE Client
const updateClient = asyncWrapper(async (req, res) => {});

module.exports = {
  getAllClients,
  getClient,
  createClient,
  deleteClient,
  updateClient,
};
