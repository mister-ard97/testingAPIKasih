'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    scholarshipId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    nominalSubscription: DataTypes.INTEGER,
    remainderDate: DataTypes.DATE,
    isCancelled: DataTypes.INTEGER,
    cancelledDate: DataTypes.DATE,
    monthLeft: DataTypes.INTEGER
  }, {});
  Subscription.associate = function(models) {
    // SCHOLARSHIP
    // USERID
    Subscription.belongsTo(models.scholarship, {foreignKey : 'scholarshipId'})
    Subscription.belongsTo(models.User, { foreignKey : 'userId'})
  };
  return Subscription;
};