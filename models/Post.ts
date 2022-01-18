import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
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
    default: ''
  }
}, { timestamps: true })

const Post = mongoose.models.posts || mongoose.model('posts', postSchema)

export default Post
