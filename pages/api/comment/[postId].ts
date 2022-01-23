import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongo'
import Comment from '../../../models/Comment'

export default async function commentsOfPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  try {
    const comments = await Comment.find({
      postId: req.query.postId,
    }).sort({ createdAt: -1 })
    !comments && res.status(404).json({ error: 'Post has no comments' })
    res.status(200).json(comments)
  } catch (err: any) {
    res.json(err.message)
  }
}
