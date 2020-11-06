import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = (event) => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      {loggedIn ? <Dashboard /> : <LandingPage click={signIn} />}
    </div>
  );
}

export default App;
