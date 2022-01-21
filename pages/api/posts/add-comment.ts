import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongo'
import Post from '../../../models/Post'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  if (req.method === 'POST') {
    try {
      const findPostAndUpdate = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: { name: req.body.name, comment: req.body.comment, userImage: req.body.img } }
      })
      !findPostAndUpdate && res.status(404).json({ error: 'Post not founded' })
      const findPost = await Post.findById(req.body.postId)
      !findPost && res.status(404).json({ error: 'Post not founded' })
      res.status(200).json(findPost)
    } catch (err: any) {
      res.json(err.message)
    }
  }
}
