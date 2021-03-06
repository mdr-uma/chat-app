import React, { useState, useRef } from 'react'
import './App.css'

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
        <div className="App">
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
        <h1 className="google-logo">G</h1> 
        <br/>
        <button className="sign-in" onClick={googleSignIn}>Sign in with Google</button>
    </div>
  )
}

const SignOut = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

const ChatRoom = () => {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages')
    const sortedMessages = messagesRef.orderBy('createdAt').limit(25)

    const [messages] = useCollectionData(sortedMessages, {idField: 'id'})

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
        })

        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return(
        <div>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="text message" />
                <button type="submit" disabled={!formValue}>Send</button>           
            </form> 
        </div>     
    )
}

const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return(
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://picsum.photos/id/1/200/300'} />
            <p>{text}</p>
        </div>
    )
}

export default App