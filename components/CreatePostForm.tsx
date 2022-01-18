import { FC, Ref, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth';
import FileBase from 'react-file-base64'

interface CreatePostFormProps {
  handler: (body:string, formRef: any, setBody: Function) => void;
  handlerWithImg: (body: string, img:string, formRef: any, setBody: Function) => void;
}

const CreatePostForm: FC<CreatePostFormProps> = (props: CreatePostFormProps) => {
  const { user } = useAuth();
  const [body, setBody] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const formRef:Ref<HTMLFormElement>  = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (img === '') {
      props.handler(body, formRef, setBody)
    } else {
      props.handlerWithImg(body, img, formRef, setBody) 
    }
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col items-center justify-center mt-4'>
      <div className='mb-2'>
      {user ? (
        <textarea
          placeholder={`What's in your mind. ${user.name}`} 
          className='border-gray-400 border-solid border-2 rounded p-2 text-center w-80 resize-none h-12'
          required
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      ) : ''}
      </div>
      <FileBase multiple={false} onDone={(base: { base64: string }) => setImg(base.base64)} />
      <button className='bg-teal-500 mt-2 text-white py-2 px-4 rounded duration-1000 ml-3 hover:bg-white hover:text-teal-500'>Post</button>
    </form>
  )
}

export default CreatePostForm

