const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Profile extends Model {}


module.exports = Profile;