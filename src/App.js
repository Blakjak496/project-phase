import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = (user) => {
    setCurrentUser(user);
  }

  console.log(currentUser);

  return (
    <div className="App">
      {currentUser ? <Dashboard /> : <LandingPage click={signIn} />}
    </div>
  );
}

export default App;
