import React, {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../Home"


export default function LoginAuth() {

    const navigate = useNavigate();

    const reRoute = (id) => {
        //login
        if (id === 1) {
          navigate('/register')
        }
        //register
        if (id === 2) {
          navigate('/login')
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleChange = (id) => {
        const authentication = getAuth();
    
        //login
        if (id === 1) {
          signInWithEmailAndPassword(authentication, email, password)
          .then((response) => {
            navigate('/')
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
            onAuthStateChanged(authentication, (user) => {
              if(user) {
                console.log("Login successful! User ID: " + user.uid);  
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
            if (error.code === "auth/invalid-email") {
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


      return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={
                <Home />}
                />
                <Route path='/login' element={
                <LoginForm 
                    title1="Login"
                    title2="Register" 
                    setEmail={setEmail}
                    setPassword={setPassword}
                    handleChange={() => handleChange(1)}
                    reRoute={() => reRoute(1)}                    
                />} 
                />
                <Route path='/register' element={
                <LoginForm 
                    title1="Register"
                    title2="Login"
                    setEmail={setEmail}
                    setPassword={setPassword}
                    handleChange={() => handleChange(2)}          
                    reRoute={() => reRoute(2)}          
                />} 
                />
            </Routes>
        </>

    );
}