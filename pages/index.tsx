import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { GetServerSideProps } from 'next'
import dbConnect from '../lib/mongo'
import PostModel from '../models/Post'
import useSwr from 'swr'

import CreatePostForm from '../components/CreatePostForm'
import Post from '../components/Post'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState<string>('Home')
  const { data, error } = useSwr('/api/posts/all', fetcher)

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      setTitle('Login')
    }
  }, [user, router])

  const createPost = (body: string, formRef: any, setBody: Function) => {
    user &&
      fetch('/api/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          body: body,
        }),
      })
        .then(() => {
          formRef.current.reset()
          setBody('')
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const createPostWithImg = (
    body: string,
    img: string,
    formRef: any,
    setBody: Function
  ) => {
    user &&
      fetch('/api/posts/new-with-img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          body: body,
          img: img,
        }),
      })
        .then(() => {
          formRef.current.reset()
          setBody('')
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      {user ? (
        <div>
          <div className='flex flex-col justify-center'>
            <div>
              <h1 className='text-3xl text-center font-semibold mt-5'>
                Hello {user.name}!
              </h1>
            </div>
            <CreatePostForm
              handler={createPost}
              handlerWithImg={createPostWithImg}
            />
          </div>
          {data?.map((post: any) => (
            <Post
              key={post._id}
              name={post.name}
              body={post.body}
              img={post.img}
              _id={post._id}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Home
