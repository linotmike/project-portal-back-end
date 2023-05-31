const { Model, Datatypes } = require("sequelize");

const sequelize = require("../config/connection");

class Language extends Model {}

Language.init(
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
        }
        
    }
);

module.exports = Language;