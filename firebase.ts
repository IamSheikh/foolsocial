import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

declare namespace process {
  var env: {
    NEXT_PUBLIC_API_KEY: string
    NEXT_PUBLIC_AUTH_DOMAIN: string
    NEXT_PUBLIC_PROJECT_ID: string
    NEXT_PUBLIC_STORAGE_BUCKET: string
    NEXT_PUBLIC_MESSAGINGSENDERID: string
    NEXT_PUBLIC_APP_ID: string
  }
}

const firebaseConfig: {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
} = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
