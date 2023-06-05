const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
    {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
)

module.exports = Message;