const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class UserProject extends Model {}

UserProject.init(
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
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Project',
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

module.exports = UserProject;