'use strict';
module.exports = (sequelize, DataTypes) => {
  const scholarship = sequelize.define('scholarship', {
    judul: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    schoolId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER,
    durasi: DataTypes.INTEGER,
    description: DataTypes.STRING,
    shareDescription: DataTypes.STRING,
    scholarshipStart: DataTypes.DATE,
    scholarshipEnded: DataTypes.DATE,
    isVerified: DataTypes.INTEGER,
    isOngoing: DataTypes.INTEGER,
    status : DataTypes.STRING,
    note: DataTypes.STRING
  }, {});
  scholarship.associate = function(models) {
    // associations can be defined here
    scholarship.belongsTo(models.School, { foreignKey : 'schoolId'})
    scholarship.belongsTo(models.User, { foreignKey : 'userId'})
    scholarship.belongsTo(models.Student, { foreignKey : 'studentId'})
    scholarship.hasMany(models.Subscription, {foreignKey : 'scholarshipId'})
    scholarship.hasMany(models.Payment, {foreignKey : 'scholarshipId'})
  };
  return scholarship;
};