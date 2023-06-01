const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProjectLanguage extends Model {}

ProjectLanguage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Project',
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

module.exports = ProjectLanguage;