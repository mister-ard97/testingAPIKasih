'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payout = sequelize.define('Payout', {
    projectId: DataTypes.INTEGER,
    scholarshipId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    beneficiary_name: DataTypes.STRING,
    beneficiary_account: DataTypes.STRING,
    bank: DataTypes.STRING,
    reference_no: DataTypes.STRING,
    notes: DataTypes.STRING,
    beneficiary_email: DataTypes.STRING,
    status: DataTypes.STRING,
    created_by: DataTypes.STRING
  }, {});
  Payout.associate = function(models) {
    // associations can be defined here
    Payout.belongsTo(models.Project, { foreignKey: 'projectId'})
    Payout.belongsTo(models.scholarship, { foreignKey: 'scholarshipId'})
  };
  return Payout;
};