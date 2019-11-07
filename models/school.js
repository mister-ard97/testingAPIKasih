'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telepon: DataTypes.STRING,
    namaPemilikRekening: DataTypes.STRING,
    nomorRekening: DataTypes.STRING,
    bank: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {});
  School.associate = function(models) {
    // associations can be defined here
    School.hasMany(models.Student, {foreignKey : 'schoolId'})
    School.hasMany(models.StudentRevision, {foreignKey : 'schoolId'})
    School.hasMany(models.scholarship, {foreignKey: 'schoolId'})
  };
  return School;
};