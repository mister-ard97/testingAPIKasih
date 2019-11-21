'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentRevision = sequelize.define('StudentRevision', {
    name: DataTypes.STRING,
    pendidikanTerakhir: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: DataTypes.STRING,
    provinsi : DataTypes.STRING,
    alamat: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    studentImage: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    story: DataTypes.STRING,
    shareDescription : DataTypes.STRING,
    

    nomorRekening : DataTypes.STRING,
    pemilikRekening : DataTypes.STRING,
    alamatSekolah : DataTypes.STRING,
    bank : DataTypes.STRING,
    cabangBank : DataTypes.STRING,
    teleponSekolah : DataTypes.STRING,
    namaSekolah : DataTypes.STRING,
    kartuSiswa : DataTypes.STRING,
    raportTerakhir : DataTypes.STRING,
    kartuKeluarga : DataTypes.STRING,
    jumlahSaudara : DataTypes.INTEGER,
    biayaSekolah : DataTypes.INTEGER,
    kelas : DataTypes.INTEGER,
    dataPenghasilan : DataTypes.STRING,
    studentId :  DataTypes.INTEGER,
    dataStatus: DataTypes.STRING,
    statusNote: DataTypes.STRING
  }, {});
  StudentRevision.associate = function(models) {
    // associations can be defined here
    StudentRevision.belongsTo(models.User, {foreignKey: 'userId'})

    StudentRevision.belongsTo(models.Student, {foreignKey : 'studentId'})
  };
  return StudentRevision;
};