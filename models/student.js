'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
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
    dataStatus: DataTypes.STRING,
    statusNote: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsTo(models.School, { foreignKey: 'schoolId'})
    Student.hasMany(models.StudentDetail, {foreignKey : 'studentId'})
    Student.belongsTo(models.User, {foreignKey : 'userId'})
    Student.hasOne(models.scholarship, {foreignKey : 'studentId'})
    
    Student.hasMany(models.StudentRevision, {foreignKey : 'studentId'})

    Student.hasMany(models.StudentDetailRevision, {foreignKey : 'studentId'})
  };
  return Student;
};