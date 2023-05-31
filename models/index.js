const User = require('./User');
const Profile = require('./Profile');
const Project = require('./Project');
const Language = require('./Language');

// creates 1:1 association between User and Profile

User.hasOne(Profile, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
});

Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

// creates 1:N association between User and Project, with User alias of 'Owner'

User.hasMany(Project, {
    foreignKey: 'owner_id',
    as: 'Owner',
});

Project.belongsTo(User, {
    foreignKey: "owner_id",
    as: "Owner",
});

// creates N:M association between User and Project, with User alias of 'Developer'

User.belongsToMany(Project, {
    through: "UserProject",
    foreignKey: "user_id",
    as: "Developer",
});
  
Project.belongsToMany(User, {
    through: "UserProject",
    foreignKey: "project_id",
    as: "Developer",
});

// creates N:M association between User and Language

User.belongsToMany(Language, {
    through: "UserLanguage",
    foreignKey: "user_id",
});
  
Language.belongsToMany(User, {
    through: "UserLanguage",
    foreignKey: "language_id",
});

// creates N:M association between Project and Language

Project.belongsToMany(Language, {
    through: "ProjectLanguage",
    foreignKey: "project_id",
});
  
Language.belongsToMany(Project, {
    through: "ProjectLanguage",
    foreignKey: "language_id",
});

module.exports = { User, Profile, Project, Language };