import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    comments: {
      type: Array,
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Post = mongoose.models.posts || mongoose.model('posts', postSchema)

export default Post
