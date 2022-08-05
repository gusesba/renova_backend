const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        number: DataTypes.DOUBLE,
        phone: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "client",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.product, { foreignKey: "providerId", as: "product" });
    this.hasMany(models.sell, { foreignKey: "buyerId", as: "buyer" });
  }
}

module.exports = Client;
