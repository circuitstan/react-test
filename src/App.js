import React, {useEffect, useState} from "react";
import Home from "./Home"
import LoginForm from "./components/LoginForm"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const navigate = useNavigate();

  const handleAction = (id) => {
    const authentication = getAuth();

    //login
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        navigate('/')
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        onAuthStateChanged(authentication, (user) => {
          if(user) {
            console.log("yes")
            console.log(user.uid);  
          }
        })
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Incorrect email");
        }
      })
    }

    //register
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        navigate('/')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email already in use');
        }
      })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }
  }, [])

  const authentication = getAuth();
  onAuthStateChanged(authentication, (user) => {
    if(user) {
      console.log(user.uid);  
    }
  })

  return (
      <div>
        <>
          <ToastContainer />
          <Routes>
            <Route path='/' element={
              <Home />}
            />
            <Route path='/login' element={
              <LoginForm 
                title="Login" 
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}          
              />} 
            />
            <Route path='/register' element={
              <LoginForm 
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}          
              />} 
            />
          </Routes>
        </>   
       
      </div>
  );
}

export default App;
