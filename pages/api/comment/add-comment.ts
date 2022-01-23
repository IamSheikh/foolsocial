import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongo'
import Comment from '../../../models/Comment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  if (req.method === 'POST') {
    try {
      const newComment = new Comment({
        name: req.body.name,
        postId: req.body.postId,
        img: req.body.img,
        comment: req.body.comment,
      })
      await newComment.save()
      res.status(200).json(newComment)
    } catch (err: any) {
      res.json(err.message)
    }
  }
}
