const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
)

module.exports = Message;