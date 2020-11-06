import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const signIn = (event) => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      <LandingPage click={signIn} />
    </div>
  );
}

export default App;
