import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Navbar from '../components/Navbar'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (loggedInUser) => {
    if (loggedInUser) {
      // @ts-ignore
      setUser(loggedInUser)
    } else {
      setUser(null)
    }
  })
  return (
    <AuthProvider>
      {user ? (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
    </AuthProvider>
  )
}

export default MyApp
