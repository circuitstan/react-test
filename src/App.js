import React, {useEffect, useState} from "react";
import Home from "./Home"
import LoginForm from "./components/LoginForm"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "@googlemaps/js-api-loader"



function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


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

  const loader = new Loader({
    apiKey: "AIzaSyASkpletaqUH-NHlo1avkOAijauzoDf09A",
    version: "weekly",
  });
  
  var map;
  var infoWindow;
  var marker;

  loader.load().then(() => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 59.439299, lng: 24.730721 },
      zoom: 12,
    });

    infoWindow = new window.google.maps.InfoWindow();
    marker = new window.google.maps.Marker();
    var scooter = new window.google.maps.Marker();
    var scooterPos = {
      lat:59.429096,
      lng:24.725351
    }
    const tuulMarker = "/tuulmarker2.png"
    scooter.setPosition(scooterPos);
    scooter.setMap(map);
    scooter.setIcon(tuulMarker);


    const locationButton = document.createElement("button");
    locationButton.textContent = "⌖"
    locationButton.classList.add("custom-map-control-button");
    map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            marker.setPosition(pos);
            marker.setMap(map);
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(16);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });

  });

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
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
       
      </div>
  );
}

export default App;
