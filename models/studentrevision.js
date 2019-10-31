'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentRevision = sequelize.define('StudentRevision', {
    name: DataTypes.STRING,
    pendidikanTerakhir: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    studentImage: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    story: DataTypes.STRING,
    schoolId: DataTypes.INTEGER,
    studentId : DataTypes.INTEGER
  }, {});
  StudentRevision.associate = function(models) {
    // associations can be defined here
    StudentRevision.belongsTo(models.User, {foreignKey: 'userId'})
    StudentRevision.belongsTo(models.School, {foreignKey : 'schoolId'})
    StudentRevision.belongsTo(models.Student, {foreignKey : 'studentId'})
  };
  return StudentRevision;
};