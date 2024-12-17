import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";

export default class Pokemon_Type extends Model {}

Pokemon_Type.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "pokemon_type",
  }
);
