import { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import useAuth from '../hooks/useAuth'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import Link from 'next/link'

const Navbar: FC = () => {
  const { user, setUser } = useAuth()

  const logoutUser = () => {
    setUser(null)
    signOut(auth)
  }

  return (
    <nav className='flex justify-between p-2 border-b-2 border-solid border-gray-300'>
      <Link href='/'>
        <h1 className='ml-2 cursor-pointer text-3xl custom-font font-bold'>
          Fool Social
        </h1>
      </Link>
      <div className='font-bold  flex text-3xl justify-center'>
        {user ? (
          <>
            <Avatar
              alt={user.name?.toString()}
              srcSet={user.photo?.toString()}
              className='mr-2'
            />
            {`${user.name}`}
          </>
        ) : (
          ''
        )}
      </div>
      <div className='flex justify-end'>
        <button
          className='bg-teal-500 text-white p-2 rounded duration-1000 hover:bg-white hover:text-teal-500'
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>

      <style jsx>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
          .custom-font {
            font-family: 'Lobster', cursive;
          }
        `}
      </style>
    </nav>
  )
}

export default Navbar
