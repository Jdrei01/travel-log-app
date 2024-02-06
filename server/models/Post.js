const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
      location: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
        unique: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
    },
);

const Post = model('Post', postSchema);

module.exports = Post;
