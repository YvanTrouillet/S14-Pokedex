import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";

export default class Team_Pokemon extends Model {}

Team_Pokemon.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "team_pokemon",
  }
);
