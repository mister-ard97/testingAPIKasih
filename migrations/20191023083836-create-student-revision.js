'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentRevisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pendidikanTerakhir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggalLahir: {
        type: Sequelize.DATE,
        allowNull: false
      },
      studentImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        },
      },
      story: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shareDescription : {
        type : Sequelize.STRING,
        allowNull : false
      },
      nomorRekening : {
        type : Sequelize.STRING,
        allowNull : false
      },
      pemilikRekening : {
        type : Sequelize.STRING,
        allowNull : false
      },
      alamatSekolah : {
        type : Sequelize.STRING,
        allowNull : false
      },
      bank : {
        type : Sequelize.STRING,
        allowNull : false
      },
      cabangBank : {
        type : Sequelize.STRING,
        allowNull : false
      },
      teleponSekolah : {
        type : Sequelize.STRING,
        allowNull : false
      },
      namaSekolah : {
        type : Sequelize.STRING,
        allowNull : false
      },
      kartuSiswa : {
        type : Sequelize.STRING,
        allowNull : false
      },
      raportTerakhir : {
        type : Sequelize.STRING,
        allowNull : false
      },
      kartuKeluarga : {
        type : Sequelize.STRING,
        allowNull : false
      },
      jumlahSaudara : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      biayaSekolah : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      kelas : {
        type : Sequelize.STRING,
        allowNull : false
      },
      dataPenghasilan : {
        type : Sequelize.STRING,
        allowNull : false
      },
      studentId : {
        type: Sequelize.INTEGER,
        references : {
          model : 'Students',
          key : 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentRevisions');
  }
};