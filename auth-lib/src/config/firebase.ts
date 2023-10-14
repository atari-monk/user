import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAy8B3wWtwJ3_TC8_h6vYKD0jn4bCm-39Y',
  authDomain: 'atari-monk-auth.firebaseapp.com',
  projectId: 'atari-monk-auth',
  storageBucket: 'atari-monk-auth.appspot.com',
  messagingSenderId: '56849459287',
  appId: '1:56849459287:web:0f2837eaca13f2b0bf9b12',
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup }
