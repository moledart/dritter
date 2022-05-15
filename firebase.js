import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA3hNRNhxlgTlErDkSltqhChDDID3NHCIw',
  authDomain: 'dritter-289f8.firebaseapp.com',
  projectId: 'dritter-289f8',
  storageBucket: 'dritter-289f8.appspot.com',
  messagingSenderId: '927200989896',
  appId: '1:927200989896:web:711db20c9ade09b7a08bfd',
}

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
