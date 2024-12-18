import { Pokemon, Team, Team_Pokemon } from "../models/association.js";

const teamController = {
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.findAll({
        include: {
          association: "pokemon",
        },
      });
      res.status(200).json(teams);
    } catch (error) {
      console.error(error);
    }
  },
  getOneTeam: async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.id, {
        include: [
          {
            association: "pokemon",
            attributes: ["id", "name", "hp", "atk", "def", "atk_spe", "def_spe", "speed"],
            through: { attributes: [] },
            include: [
              {
                association: "type",
                attributes: ["name"],
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      res.status(200).json(team);
    } catch (error) {
      console.error(error);
    }
  },
  createdTeam: async (req, res) => {
    try {
      const newTeam = await Team.create(req.body);
      res.status(201).json(newTeam);
    } catch (error) {
      console.error(error);
    }
  },
  updateTeam: async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.id);

      const { name, description } = req.body;

      if (name) {
        team.name = name;
      }
      if (description) {
        team.description = description;
      }

      team.save();

      res.status(200).json(team);
    } catch (error) {
      console.error(error);
    }
  },

  updatePokemonTeam: async (req, res) => {
    try {
      const { idTeam, idPokemon } = req.params;

      await Team_Pokemon.create({ pokemon_id: idPokemon, team_id: idTeam });

      res.status(200).json({ message: "Le pokemon a bien été ajouté à la team !" });
    } catch (error) {
      console.error(error);
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const team = await Team.findByPk(req.params.id);

      team.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  },

  deletePokemonToTeam: async (req, res) => {
    try {
      const { idTeam, idPokemon } = req.params;
      const result = await Team_Pokemon.findOne({
        where: {
          pokemon_id: idPokemon,
          team_id: idTeam,
        },
      });

      result.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  },
};

export default teamController;
