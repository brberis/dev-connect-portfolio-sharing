const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// create project model
class Project extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      project_id: body.project_id
    }).then(() => {
      return Project.findOne({
        where: {
          id: body.project_id
        },
        attributes: [
          'id',
          'title',
          'image_url',
          'description',
          'github_url',
          'date',
          'public',
          'user_id',
          'created_at'
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE project.id = vote.project_id)'), 'vote_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'project_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields for project model
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    github_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    public:{
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'project'
  }
);

module.exports = Project;
