const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "client",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.product, { foreignKey: "providerId", as: "products" });
  }
}

module.exports = Client;
