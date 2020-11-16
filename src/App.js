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
import Greeting from './components/greeting';
import NavBtns from './components/Nav/NavBtns';



firebase.initializeApp(firebaseConfig);



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [exists, setExists] = useState(true);
  const [activePage, setActivePage] = useState('dash');
  const [rememberMe, setRememberMe] = useState(false);
  const firestore = firebase.firestore();
  
  let accountsRef;
  if (currentUser) {
    accountsRef = firestore.collection('accounts').doc(currentUser.uid);
     
  }
  console.log(activePage)
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      const userStr = localStorage.getItem('currentUser');
      const userObj = JSON.parse(userStr);
      setCurrentUser(userObj);
    } else {
        console.log('no user in localStorage')
        if (sessionStorage.getItem('currentUser')) {
          const userStr = sessionStorage.getItem('currentUser');
          const userObj = JSON.parse(userStr);
          setCurrentUser(userObj)
        } else {
          console.log('no user in session storage');
        }
      }
  }, [])

  
  
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
              placeholder: true,
            }, {merge: true})
            .then((res) => {
              console.log('events collection created');
              const feedsRef = accountsRef.collection('feeds');
              feedsRef.add({
                url: 'https://feeds.bbci.co.uk/news/rss.xml?edition=uk'
              })
              .then((res) => {
                console.log('feeds collection created');
              })
            })
          })
        })
        .catch((err) => {
          console.log('creation failed', err)
        })

      }
    }


  }, [currentUser, exists, accountsRef])

  
  
  
  
  const signIn = (user) => {
    setCurrentUser(user);
    
  }

  const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      sessionStorage.clear();
      setActivePage('dash');
      console.log('signed out')
    })
    .catch((err) => {
      console.log('sign-out error')
    })
  }
  
  return (
    <UserProvider value={{currentUser, accountsRef, activePage, setActivePage}}>
      <div id="app" className="App">
        
        {currentUser ?
        <> 
        <div className="page-header">
          <NavBtns click={signOut} />
          <Greeting />
          
        </div>
        <div id={"page-body"} className="page-body">
            <Router className="router" primary={false}>
              <Dashboard path="/" />
              <JobsPage path="/jobs" />
              <JobPage path="/jobs/:job_id" />
              <CalendarPage path="/calendar" />
            </Router>
        </div> 
        </>
        : <LandingPage click={signIn} remember={setRememberMe} rememberState={rememberMe} path="/" />}
      </div>

    </UserProvider>
  );
}

export default App;
