import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import MyAccount from './components/MyAccount';
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [alert, setAlert] = useState({msg:"", type: ""});

  const showAlert = (msg, type) => {
    setAlert({msg : msg, type : type});
    setTimeout(() => {
      setAlert({msg:"", type: ""});
    }, 1500);
  }

  const [Progress, setProgress] = useState(0);

  return (
    <>
      <NoteState>
        <Router>
          <LoadingBar
            color='#198754'
            progress={Progress}
            height={3} 
          />
          <NavBar showAlert={showAlert}/>
          <div className="container">
          <Alert alert={alert}/>
          <Routes>
            <Route exact path='/'  element={<Home showAlert={showAlert} setProgress={setProgress} />} />
            <Route exact path='/about' element={<About setProgress={setProgress} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} setProgress={setProgress} />} />
            <Route exact path='/signup' element={<SignUp showAlert={showAlert} setProgress={setProgress} />} />
            <Route exact path='/myaccount' element={<MyAccount setProgress={setProgress} />}  />
          </Routes>
          <Footer/>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
