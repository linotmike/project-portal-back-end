const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Message extends Model {}

Message.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Project',
                key: 'id',
            },
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },{
        sequelize,
        freezeTableName: true,
        underscored: true,
    }
)

module.exports = Message;