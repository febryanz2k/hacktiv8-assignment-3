const { Photo, User } = require("../models");

class PhotoController {
  static async getAllPhotos(req, res) {
    try {
      const { id } = req.UserData;

      const data = await Photo.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: User,
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(error?.code || 500).json(error);
    }
  }

  static async getOnePhotoByID(req, res) {
    try {
      const { id } = req.params;

      const { id: userId } = req.UserData;

      const data = await Photo.findByPk(id);

      if (!data) {
        throw {
          code: 404,
          message: "Data not found!",
        };
      }

      if (data.UserId !== userId) {
        throw {
          code: 403,
          message: "Forbiden",
        };
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(error?.code || 500).json(error);
    }
  }

  static async createPhoto(req, res) {
    const { title, caption, image_url } = req.body;
    const { id } = req.UserData;

    try {
      const result = await Photo.create({
        title,
        caption,
        image_url,
        UserId: id,
      });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(error?.code || 500).json(error);
    }
  }

  static async updateOnePhotoByID(req, res) {
    const { id } = req.params;
    const { title, caption, image_url } = req.body;
    const data = {
      title,
      caption,
      image_url,
    };

    try {
      const result = await Photo.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(error?.code || 500).json(error);
    }
  }

  static async deleteOnePhotoByID(req, res) {
    const { id } = req.params;

    try {
      const result = await Photo.destroy({
        where: {
          id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(error?.code || 500).json(error);
    }
  }
}

module.exports = PhotoController;
