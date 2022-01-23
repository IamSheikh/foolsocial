import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Comment =
  mongoose.models.comments || mongoose.model('comments', commentSchema)

export default Comment
