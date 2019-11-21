'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nominal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      statusPayment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      projectId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Projects',
          key : 'id'
        }
      },
      scholarshipId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Scholarships',
          key : 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        },
      },
      isRefund: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      refundDate: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      komentar: {
        type: Sequelize.STRING
      },
      isAnonim: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      noPembayaran: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('Payments');
  }
};