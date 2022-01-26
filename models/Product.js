const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        price: DataTypes.DOUBLE,
        type: DataTypes.STRING,
        brand: DataTypes.STRING,
        size: DataTypes.STRING,
        color: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "product",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.client, { foreignKey: "providerId", as: "provider" });
    this.hasOne(models.sell, { foreignKey: "productId", as: "product" });
  }
}

module.exports = Product;
