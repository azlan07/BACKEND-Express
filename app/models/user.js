'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  User.init({
    nik: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    kelamin: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.STRING,
    agama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telepon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};