import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

import Navbar from '../components/Navbar'
import CreatePostForm from '../components/CreatePostForm'
import Post from '../components/Post'

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<
    | []
    | {
      _id: string;
      name: string;
      username: string;
      body: string;
      img: string;
    }[]
  >([]);
  const [title, setTitle] = useState<string>('Home')

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      setTitle('Login')
    }

    fetch('/api/posts/all', { method: 'GET' })
      .then(async (res) => await res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));

  }, [user, router, posts])

  const createPost = (body: string, formRef: any, setBody: Function) => {
    user && fetch('/api/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        body: body
      })
    }).then(() => {
      formRef.current.reset()
      setBody('')
    }).catch(err => {
      console.log(err)
    })

  }

  const createPostWithImg = (body: string, img: string, formRef: any, setBody: Function) => {
    user && fetch('/api/posts/new-with-img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        body: body,
        img: img
      })
    }).then(() => {
      formRef.current.reset()
      setBody('')
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {user ? (
        <div>
          <Navbar />
          <div className='flex flex-col justify-center'>
            <div>
              <h1 className='text-3xl text-center font-semibold mt-5'>Hello {user.name}!</h1>
            </div>
            <CreatePostForm handler={createPost} handlerWithImg={createPostWithImg} />
          </div>
          {posts.length === 0 ? (
            <div className='flex justify-center mt-10'>
              <h1 className='text-3xl font-bold'>Loading...</h1>
            </div>
          ) : (
            posts instanceof Array && posts.map(post => (
              <Post key={post._id} _id={post._id} name={post.name} body={post.body} img={post.img} />
            ))
          )}

        </div>
      ) : ''}
    </div>
  )
}

export default Home
