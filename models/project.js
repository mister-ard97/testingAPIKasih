'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    projectCreated: DataTypes.DATE,
    projectEnded: DataTypes.DATE,
    currentValue : DataTypes.INTEGER,
    totalTarget: DataTypes.INTEGER,
    projectImage: DataTypes.STRING,
    shareDescription: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isCancelled: DataTypes.INTEGER,
    cancelledDate: DataTypes.DATE,
    isGoing: DataTypes.INTEGER,
    status : DataTypes.STRING,
    isDeleted: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.hasMany(models.Payment, { foreignKey : 'projectId' })
    Project.belongsTo(models.User, { foreignKey : 'userId'})
    Project.belongsTo(models.Payout, { foreignKey : 'projectId'})
  };
  return Project;
};