import { FC, useState } from 'react'

interface Props {
  handler: (comment: string, setCommet: Function) => void
}

const AddCommentForm: FC<Props> = (props) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    props.handler(comment, setComment)
  }
  return (
    <div className='text-center mt-10'>
      <h1 className='text-2xl font-semibold'>Add Comment</h1>
      <form onSubmit={handleSubmit} className='flex justify-center mt-4'>
        <div className='mb-2'>
          <textarea
            placeholder='Write a comment'
            className='border-gray-400 border-solid border-2 rounded p-2 text-center w-80 resize-none h-12'
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <button className='bg-teal-500 mt-2 text-white py-2 px-4 rounded duration-1000 ml-3 hover:bg-white hover:text-teal-500'>
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCommentForm
