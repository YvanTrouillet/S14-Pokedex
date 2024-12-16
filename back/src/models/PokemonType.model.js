import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";

export default class Pokemon_Type extends Model {}

Pokemon_Type.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pokemon_type",
  }
);
