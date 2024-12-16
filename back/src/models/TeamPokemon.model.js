import sequelize from "../sequelize.js";
import { DataTypes, Model } from "sequelize";

export default class Team_Pokemon extends Model {}

Team_Pokemon.init(
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "team_pokemon",
  }
);
