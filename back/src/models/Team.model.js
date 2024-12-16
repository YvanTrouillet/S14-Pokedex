import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";

export default class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "team",
  }
);
