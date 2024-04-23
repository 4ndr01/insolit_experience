import mongoose, { Schema, models } from "mongoose";

const postsShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
    image: {
    type: String,
    required: true,
    }
});

const Post = mongoose.models.Post || mongoose.model("Post", postsShema);

export default Post;