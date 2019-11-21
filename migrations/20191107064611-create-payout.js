'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      scholarshipId: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      beneficiary_name: {
        type: Sequelize.STRING
      },
      beneficiary_account: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      reference_no: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      beneficiary_email: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payouts');
  }
};