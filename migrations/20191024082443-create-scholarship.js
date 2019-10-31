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
      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Schools',
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
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isOngoing: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('scholarships');
  }
};