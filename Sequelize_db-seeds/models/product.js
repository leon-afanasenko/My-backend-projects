import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Product extends Model {}

Product.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
    timestamps: true,
  }
);

export default Product;
