const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class UserLanguage extends Model {}

UserLanguage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            }
        },
        language_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Language',
                key: 'id',
            }
        },
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);    

module.exports = UserLanguage;