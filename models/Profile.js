const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Profile extends Model {}

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        picture: {
            type: DataTypes.STRING,
        },
        bestWorks: {
            type: DataTypes.STRING,
        },
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Profile;