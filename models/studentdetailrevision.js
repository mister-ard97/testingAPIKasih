'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentDetailRevision = sequelize.define('StudentDetailRevision', {
    pictureReport: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    class: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    detailId: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {});
  StudentDetailRevision.associate = function(models) {
    // associations can be defined here
    StudentDetailRevision.belongsTo(models.StudentDetail, {foreignKey : 'detailId'})
    StudentDetailRevision.belongsTo(models.Student, { foreignKey : 'studentId'})
  };
  return StudentDetailRevision;
};