import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface AuthContextInterface {
  user: null | {
    name: null | string
    email: null | string
    photo: null | string
    userId: null | string
  }
  setUser: any
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  setUser: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    name: null | string
    email: null | string
    photo: null | string
    userId: null | string
  }>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          userId: user.uid,
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
