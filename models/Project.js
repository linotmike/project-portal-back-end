const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true, // true = open, false = closed
        },
        dueDate: {
            type: DataTypes.DATE,
        },
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);    

module.exports = Project;