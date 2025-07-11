'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    static associate(models) {
      Employer.hasMany(models.Job, {
        foreignKey: 'employer_id',
        as: 'jobs',
      });
    }
  }

  Employer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPerson: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    location: DataTypes.STRING,
    industry: DataTypes.STRING,
    companySize: DataTypes.STRING,
    logoUrl: DataTypes.STRING,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    companyDescription: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Employer',
    tableName: 'employers',
    timestamps: true,
  });

  return Employer;
};
