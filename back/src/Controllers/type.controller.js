import { Type } from "../models/association.js";

const typeController = {
  getAllTypes: async (req, res) => {
    try {
      const types = await Type.findAll();
      res.status(200).json(types);
    } catch (error) {
      console.error(error);
    }
  },

  getOneType: async (req, res) => {
    try {
      const type = await Type.findByPk(req.params.id, {
        include: {
          association: "pokemon",
        },
      });
      res.status(200).json(type);
    } catch (error) {
      console.error(error);
    }
  },
};
export default typeController;
