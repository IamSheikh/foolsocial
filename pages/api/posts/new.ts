import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongo'
import Post from '../../../models/Post'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const newPost = new Post({
        name: req.body.name,
        body: req.body.body,
      })
      await newPost.save();
      res.status(200).json(newPost)
    } catch (err: any) {
      res.json(err.message)
    }
  }
}
