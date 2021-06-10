import React from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyCLVGROIqidCkDV8kT4dDKz-XgF7XMpdG4",
    authDomain: "wechat-3fd42.firebaseapp.com",
    projectId: "wechat-3fd42",
    storageBucket: "wechat-3fd42.appspot.com",
    messagingSenderId: "782121701141",
    appId: "1:782121701141:web:0132e6aa8c9b584c59a31c",
    measurementId: "G-540ECP7HYY"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics();


const App = () => {
    const [user] = useAuthState(auth)
    
    return(
        <div>
            <header>
                <h1>We Chat 💬</h1>
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
                <SignOut />
            </section>
        </div>
    ) 
}

const SignIn = () => {
    const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <button className="sign-in" onClick={googleSignIn}>Sign in with Google</button>
    </div>
  )
}

const ChatRoom = () => {
    return(
        <main>
            message
        </main>
    )
}

const SignOut = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default App