import { FC } from 'react'
import Image from 'next/image'

interface PostProps {
  key: string;
  _id: string;
  name: string;
  body: string;
  img: string;
}

const Post: FC<PostProps> = (props: PostProps) => {
  return (
    <div className='border-gray-400 border-solid border-2 my-4 mx-10 rounded p-2'>
      <h1 className='text-2xl font-medium'>{props.name}</h1>
      <p className='mt-1'>{props.body}</p>
      <div className='flex justify-center'>
        {props.img !== "" && (
          <Image 
            src={props.img}
            alt={`${props.name}`}
            width={500}
            height={500}
            className='text-center'
          />
      )}
      </div>
    </div>
  )
}

export default Post
