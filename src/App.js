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
import JobPage from './components/JobPage/JobPage';
import CalendarPage from './components/Calendar/CalendarPage';


firebase.initializeApp(firebaseConfig);



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [exists, setExists] = useState(true);
  const firestore = firebase.firestore();

  let accountsRef;
  if (currentUser) {
    accountsRef = firestore.collection('accounts').doc(currentUser.uid);
   
    
  }
  
  
  useEffect(() => {
    if (currentUser) {
      const doc = accountsRef.collection('jobs').doc('1');
      
      doc.get().then((res) => { setExists(res.exists) });
      

      if (!exists) {
        accountsRef.set({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        }, {merge: true})
        .then((res) => {
          console.log('account document created')
          const jobsRef = accountsRef.collection('jobs').doc('1');
          jobsRef.set({
            title: 'Add jobs to the job list',
            clientName: 'Client Name',
            deadline: 'dd/mm/yyyy',
            overview: 'Details about the job',
            id: 1,
            tasks: [],
          }, {merge: true})
          .then((res) => {
            console.log('sub-collection created');
            const eventsRef = accountsRef.collection('events').doc('1');
            eventsRef.set({
              title: 'event title',
              start: '2020-11-10',
            }, {merge: true})
            .then((res) => {
              console.log('events collection created');
            })
          })
        })
        .catch((err) => {
          console.log('creation failed', err)
        })

      }
      
    }

  }, [currentUser, exists])

  
  
  
  
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
          <JobPage click={signOut} path="/jobs/:job_id" />
          <CalendarPage click={signOut} path="/calendar" />
        </Router>
      </div>

    </UserProvider>
  );
}

export default App;
