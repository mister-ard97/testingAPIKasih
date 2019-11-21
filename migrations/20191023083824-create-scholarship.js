'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scholarships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Students',
          key : 'id'
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Users',
          key : 'id'
        },
      },
      currentValue : {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nominal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      durasi: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      shareDescription: {
        type: Sequelize.STRING
      },
      scholarshipStart: {
        type: Sequelize.DATE
      },
      scholarshipEnded: {
        type: Sequelize.DATE
      },
      isVerified: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      isOngoing: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      note: {
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
    return queryInterface.dropTable('scholarships');
  }
};