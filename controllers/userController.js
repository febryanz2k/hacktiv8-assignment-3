const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Photo } = require("../models");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const result = await User.findAll({
        include: Photo,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(error?.code || 500).json(error);
    }
  }

  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const data = await User.create({
        username,
        email,
        password,
      });

      const response = {
        id: data.id,
        username: data.username,
        email: data.email,
      };

      res.status(201).json(response);
    } catch (error) {
      res.status(error?.code || 500).json(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          name: "User Login Error",
          devMessage: `User with email "${email}" not found`,
        };
      }

      const isCorrect = comparePassword(password, user.password);
      if (!isCorrect) {
        throw {
          name: "User Login Error",
          devMessage: `User's password with email "${email}" does not match`,
        };
      }

      const payload = { id: user.id, email: user.email };
      const access_token = generateToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      res.status(error?.code || 500).json(error);
    }
  }
}

module.exports = UserController;
