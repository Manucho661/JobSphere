// models/Employer.js
module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define("Employer", {
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
    companyDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Employer;
};
