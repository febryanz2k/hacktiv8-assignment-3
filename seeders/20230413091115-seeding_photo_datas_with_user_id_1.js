"use strict";

const data = [
  {
    title: "Foto 1 Milik UserID 1",
    caption: "Ini Foto 1 Milik UserID 1",
    image_url: "https://wallpaperaccess.com/download/ling-ml-4366229",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Foto 2 Milik UserID 1",
    caption: "Ini Foto 2 Milik UserID 1",
    image_url: "https://wallpaperaccess.com/download/moskov-1446458",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Foto 3 Milik UserID 1",
    caption: "Ini Foto 3 Milik UserID 1",
    image_url:
      "https://wallpaperaccess.com/download/franco-mobile-legend-8210585",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
