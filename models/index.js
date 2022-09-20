const Project = require('./Project');
const User = require('./User');
const Comment = require('./Comment');
const Vote = require('./Vote');

// db associations
User.hasMany(Project, {
  foreignKey: 'user_id'
});

Project.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Project, {
  foreignKey: 'project_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Project.hasMany(Comment, {
  foreignKey: 'project_id'
});

User.belongsToMany(Project, {
  through: Vote,
  as: 'voted_project',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Project.belongsToMany(User, {
  through: Vote,
  as: 'voted_project',
  foreignKey: 'project_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Project, {
  foreignKey: 'project_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Project.hasMany(Vote, {
  foreignKey: 'project_id'
});

module.exports = { User, Project, Comment, Vote };
