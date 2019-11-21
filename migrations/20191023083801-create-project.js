'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      projectCreated: {
        type: Sequelize.DATE,
        allowNull: false
      },
      projectEnded: {
        type: Sequelize.DATE,
        allowNull: false
      },
      currentValue : {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalTarget: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      projectImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shareDescription: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        },
      },
      isCancelled: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      cancelledDate: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      isGoing : {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue :1
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('Projects');
  }
};