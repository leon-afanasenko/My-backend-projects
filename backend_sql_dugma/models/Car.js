import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Car = sequelize.define(
  "Car",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Cars",
    timestamps: false,
  }
);

export default Car;
