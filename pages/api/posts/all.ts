import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongo'
import Post from '../../../models/Post'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (err) {
    res.json(err)
  }
}
