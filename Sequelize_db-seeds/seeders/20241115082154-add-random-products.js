"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Product 1",
        price: 10.99,
        description: "Description of Product 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 2",
        price: 20.49,
        description: "Description of Product 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 3",
        price: 15.29,
        description: "Description of Product 3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 4",
        price: 30.99,
        description: "Description of Product 4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 5",
        price: 25.79,
        description: "Description of Product 5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 6",
        price: 5.99,
        description: "Description of Product 6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 7",
        price: 50.99,
        description: "Description of Product 7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 8",
        price: 100.49,
        description: "Description of Product 8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 9",
        price: 75.99,
        description: "Description of Product 9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Product 10",
        price: 12.49,
        description: "Description of Product 10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
