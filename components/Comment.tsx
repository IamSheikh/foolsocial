import { FC } from 'react'
import Avatar from '@mui/material/Avatar'

interface Props {
  key: string | number
  comment: {
    name: string
    postId: string
    img: string
    comment: string
    _id: string
  }
}

const Comment: FC<Props> = (props) => {
  return (
    <div className='border-gray-400 border-solid border-2 my-4 mx-10 rounded p-2 hover:scale-105 transition-transform duration-200 ease-in-out'>
      <div className='flex items-center'>
        <Avatar srcSet={props.comment.img} />
        <h1 className='text-2xl font-medium ml-2'>{props.comment.name}</h1>
      </div>
      <p className='mt-1'>{props.comment.comment}</p>
    </div>
  )
}

export default Comment
