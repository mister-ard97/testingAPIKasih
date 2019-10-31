'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentDetail = sequelize.define('StudentDetail', {
    pictureReport: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    class: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    dataStatus: DataTypes.STRING,
    statusNote: DataTypes.STRING
  }, {});
  StudentDetail.associate = function(models) {
    // associations can be defined here
    StudentDetail.belongsTo(models.Student, {foreignKey : 'studentId'})
    StudentDetail.hasMany(models.StudentDetailRevision, { foreignKey : 'detailId'})
  };
  return StudentDetail;
};
