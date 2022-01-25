import type { NextPage } from 'next'
import Head from 'next/head'
import { auth } from '../firebase'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Login: NextPage = () => {
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const [error, setError] = useState<boolean>(false)
  const { user, setUser } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState<string>('Login')

  useEffect(() => {
    if (user) {
      router.replace('/')
      setTitle('Home')
    } else {
      setTitle('Login')
    }
  }, [user, router])

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        })
        setError(false)
      })
      .catch((err) => {
        alert(err)
      })
  }
  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        setUser({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        })
        setError(false)
      })
      .catch((err) => {
        if (
          err ==
          'FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).'
        ) {
          setError(true)
        } else {
          alert(err)
        }
      })
  }
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <div className='flex justify-center items-center h-screen flex-col bg-gray-100'>
        <h1 className='text-3xl font-semibold'>Login</h1>
        {!error ? (
          <>
            <button
              onClick={loginWithGoogle}
              className='bg-red-500 text-white px-4 py-2 rounded duration-200 transition-transform ease-in-out hover:scale-105 mt-2'
            >
              Login with Google
            </button>
            <button
              onClick={loginWithFacebook}
              className='bg-blue-500 text-white px-4 py-2 rounded duration-200 transition-transform ease-in-out hover:scale-105 mt-2'
            >
              Login With Facebook
            </button>
          </>
        ) : (
          <>
            <h1 className='text-2xl'>Opps Something went wrong</h1>
            <button
              onClick={loginWithGoogle}
              className='bg-red-500 text-white px-4 py-2 rounded duration-200 transition-transform ease-in-out hover:scale-105 mt-2'
            >
              Login with Google
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
