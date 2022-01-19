import type { NextPage } from 'next'
import Head from 'next/head';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
  const provider = new GoogleAuthProvider();
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState<string>('Login');

  useEffect(() => {
    if (user) {
      router.replace('/')
      setTitle('Home')
    } else {
      setTitle('Login')
    }
  }, [user, router])

  const loginUser = () => {
    signInWithPopup(auth, provider).then(res => {
      setUser({
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL
      })
    }).catch(err => {
      alert(err)
    })
  }
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex justify-center items-center h-screen flex-col'>
        <h1 className='text-3xl font-semibold'>Login</h1>
        <button onClick={loginUser} className='bg-teal-500 text-white px-4 py-2 rounded duration-1000 hover:bg-white hover:text-teal-500 mt-2'>
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login;

