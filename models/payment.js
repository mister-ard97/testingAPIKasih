'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentType: DataTypes.STRING,
    paymentSource : DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    statusPayment: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    scholarshipId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isRefund: DataTypes.INTEGER,
    refundDate: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER,
    order_id: DataTypes.STRING,
    komentar: DataTypes.STRING,
    isAnonim: DataTypes.INTEGER,
    noPembayaran: DataTypes.STRING
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.belongsTo(models.User, { foreignKey: 'userId'})
    Payment.belongsTo(models.Project, { foreignKey: 'projectId'})
    Payment.belongsTo(models.scholarship, { foreignKey: 'scholarshipId'})
  };
  return Payment;
};