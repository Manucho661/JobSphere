// models/ads.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    static associate(models) {
      // associations if any
    }
  }
  Ad.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    company: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Ad',
    tableName: 'ads', // explicitly specify table name if needed
    timestamps: false,
  });
  return Ad;
};
