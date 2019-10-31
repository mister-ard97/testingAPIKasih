'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '-'
      },
      isGoogle: {
        type: Sequelize.STRING
      },
      isFacebook: {
        type: Sequelize.STRING
      },
      userImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // subscriptionStatus: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   defaultValue: 0
      // },
      // subscriptionNominal: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0
      // },
      // reminderDate: {
      //   type: Sequelize.DATE,
      //   defaultValue: null
      // },
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
    return queryInterface.dropTable('Users');
  }
};