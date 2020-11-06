import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';
import { useEffect } from 'react/cjs/react.production.min';

firebase.initializeApp(firebaseConfig);



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const firestore = firebase.firestore();
  if (currentUser) {
    const accountsRef = firestore.collection('accounts').doc(currentUser.uid);
    const exists = accountsRef.get().then(res => { return res.exists});
    if (!exists) {
      accountsRef.set({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        jobs: []
      }, {merge: true})
      .then((res) => {
        console.log('account document created')
      })
      .catch((err) => {
        console.log('creation failed')
      })
    }
  }
  
  const signIn = (user) => {
    setCurrentUser(user);
  }

  const signOut = () => {
    setCurrentUser(null);
  }


  return (
    <div className="App">
      {currentUser ? <Dashboard click={signOut} /> : <LandingPage click={signIn} />}
    </div>
  );
}

export default App;
