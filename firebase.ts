import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig: {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
} = {
  apiKey: 'AIzaSyApSEe5xD1g1TyxC04eN20640U__WxN8FM',
  authDomain: 'foolsocial-eeaeb.firebaseapp.com',
  projectId: 'foolsocial-eeaeb',
  storageBucket: 'foolsocial-eeaeb.appspot.com',
  messagingSenderId: '552485896919',
  appId: '1:552485896919:web:981712ecb8c5bebe192692',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
