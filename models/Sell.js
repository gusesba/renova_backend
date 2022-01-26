const { Model, DataTypes } = require("sequelize");

class Sell extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        modelName: "sell",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.product, { foreignKey: "productId", as: "product" });
    this.belongsTo(models.client, { foreignKey: "buyerId", as: "buyer" });
  }
}

module.exports = Sell;
