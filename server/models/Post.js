const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    lat: String,
    lng: String
  },
  {
    timestamps:true
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
