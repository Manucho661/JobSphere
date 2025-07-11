'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Define associations here
     */
    static associate(models) {
      // Each job belongs to one employer
      Job.belongsTo(models.Employer, {
        foreignKey: 'employer_id',
        as: 'employer'
      });
    }
  }

  Job.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    employer_id: {
      type: DataTypes.UUID, // Match Employer.id type
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'Jobs', // Optional: ensures the table name is explicit
    timestamps: true // Optional: add createdAt and updatedAt
  });

  return Job;
};
