const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Client = require("../models/Client");
const Product = require("../models/Product");
const Sell = require("../models/Sell");

const connection = new Sequelize(dbConfig);

Client.init(connection);
Product.init(connection);
Sell.init(connection);

Client.associate(connection.models);
Product.associate(connection.models);
Sell.associate(connection.models);

module.exports = connection;
