const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Language extends Model {}


module.exports = Language;