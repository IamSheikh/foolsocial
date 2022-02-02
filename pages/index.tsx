import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { GetServerSideProps } from 'next'
import dbConnect from '../lib/mongo'
import PostModel from '../models/Post'

import CreatePostForm from '../components/CreatePostForm'
import Post from '../components/Post'

interface Props {
  posts: string
}

const Home: NextPage<Props> = ({ posts }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState<string>('Home')

  let allPosts:
    | []
    | [
        {
          _id: string
          name: string
          username: string
          body: string
          img: string
        }
      ] = JSON.parse(posts)

  const refreshData = () => {
    router.replace(router.asPath)
  }

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      setTitle('Login')
    } else {
      refreshData()
    }
  }, [user, allPosts])

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
          {allPosts.map((post) => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect()

  const result = await PostModel.find({}).sort({ createdAt: -1 })
  const posts = result.map((doc) => {
    const post = doc.toObject()
    post._id = post._id.toString()
    return post
  })

  return {
    props: {
      posts: JSON.stringify(posts),
    },
  }
}

export default Home
