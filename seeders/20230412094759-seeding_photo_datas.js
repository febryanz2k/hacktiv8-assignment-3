"use strict";

const data = [
  {
    title: "Foto Hero Assasin",
    caption: "Foto hero Ling di mobile legends",
    image_url: "https://wallpaperaccess.com/download/ling-ml-4366229",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Foto Hero Support",
    caption: "Foto hero Estes di mobile legends",
    image_url: "https://wallpaperaccess.com/download/estes-6001111",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Foto Hero Marksman",
    caption: "Foto hero Moskov di mobile legends",
    image_url: "https://wallpaperaccess.com/download/moskov-1446458",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Foto Hero Tank",
    caption: "Foto hero Franco di mobile legends",
    image_url:
      "https://wallpaperaccess.com/download/franco-mobile-legend-8210585",
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
