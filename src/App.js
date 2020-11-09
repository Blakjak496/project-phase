import { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { UserProvider } from './components/UserContext';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';
import JobsPage from './components/JobsPage/JobsPage';

firebase.initializeApp(firebaseConfig);



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  
  
  const firestore = firebase.firestore();
  let accountsRef;
  if (currentUser) {
    accountsRef = firestore.collection('accounts').doc(currentUser.uid);
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
    <UserProvider value={{currentUser, accountsRef}}>
      <div className="App">
        <Router>
          {currentUser ? <Dashboard click={signOut} path="/" /> : <LandingPage click={signIn} path="/" />}
          <JobsPage click={signOut} path="/jobs" />

        </Router>
      </div>

    </UserProvider>
  );
}

export default App;
