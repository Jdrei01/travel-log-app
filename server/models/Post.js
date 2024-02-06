const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
  {
    game: DataTypes.STRING,
    genre: DataTypes.STRING, 
    rating: DataTypes.INTEGER, 
    video_embed: DataTypes.TEXT
  },
  {
    sequelize,
  }
);

module.exports = Post;
