import React, { useEffect, useState } from 'react'
import { useNavigate, Switch, Route, Link } from 'react-router-dom'
import { db } from './firebase-config';
import { getFirestore, collection, getDocs, doc, getDoc, firestore, updateDoc } from 'firebase/firestore';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import BasicButton from './components/Button';
import OutlinedButton from './components/ButtonOutlined';
import PairingSwitch from './components/PairingSwitch';
import StartStopToggle from './components/StartStopToggle';

function Home(props) {

  const [disabled, setDisabled] = React.useState(true);
  const [color, setColor] = React.useState("success");
  const [title, setTitle] = React.useState("Start");
  const [checked, setChecked] = React.useState(false);
  const [label, setLabel] = React.useState("Pair Scooter");

  const navigate = useNavigate();

  const handleLogout = () => {
      sessionStorage.removeItem('Auth Token');
      navigate('/login');
  }

  const handleChangeToggle = (e) => {
    //getUserDataLag();
    if (title === "Start") {
        setColor("error")
        setTitle("Stop")
    } else if (title === "Stop") {
        setColor("success")
        setTitle("Start") 
    }
  }

  const handleChangeSwitch = (e) => {
    if (checked === false) {
      setChecked(e.target.checked);
      setLabel("Unpair Scooter");
      console.log("turn on");
      pairScooter();
      getUserDataLag();
      getVehicleData();      
    } else if (checked === true) {
      setChecked(e.target.checked);
      setLabel("Pair Scooter");
      console.log("turn off");
      unpairScooter();
      setColor("success");
      setTitle("Start");
      getUserDataLag();
      getVehicleData();
    }
  };

  const pairScooter = () => {

    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      console.log(idToken);
      var url = 'https://europe-west3-coscooter-eu-staging.cloudfunctions.net/pair?apiKey=' + idToken;
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "vehicleCode": "code1"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }).catch(function(error) {
      console.log(error);
    });
  }

  const unpairScooter = () => {

    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      console.log(idToken);
      var url = 'https://europe-west3-coscooter-eu-staging.cloudfunctions.net/pair?apiKey=' + idToken;
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "vehicleId": "aaaaaaaaaaaaaaaa"
      });

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }).catch(function(error) {
      console.log(error);
    });
  }

  const startScooter = () => {

    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      console.log(idToken);
      var url = 'https://europe-west3-coscooter-eu-staging.cloudfunctions.net/send-commands?apiKey=' + idToken;
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "command": "START",
        "vehicleId": "aaaaaaaaaaaaaaaa"
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }).catch(function(error) {
      console.log(error);
    });
  }

  const stopScooter = () => {

    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      console.log(idToken);
      var url = 'https://europe-west3-coscooter-eu-staging.cloudfunctions.net/send-commands?apiKey=' + idToken;
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "command": "STOP",
        "vehicleId": "aaaaaaaaaaaaaaaa"
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }).catch(function(error) {
      console.log(error);
    });
  }

  const getUserData = () => {
    const userData = doc(db, "users", "3ce3P4H3K1e7KarRe9fHNwdajQf1");

    getDoc(userData).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          var vehicle = docSnap.data().activeVehicle;
          console.log(vehicle);
          if (vehicle === null) {
            setDisabled(true);
            setChecked(false);
          } else if (vehicle !== null) {
            setDisabled(false);
            setChecked(true);
          }
        } else {
          console.log("No such document!");
        }
    })
  }

  const getVehicleData = () => {
    const vehicleData = doc(db, "vehicles", "aaaaaaaaaaaaaaaa");

    getDoc(vehicleData).then(docSnap => {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
    })
  }

  function getUserDataLag() {
    setTimeout(function () {
      console.log("heyyyyy")
      getUserData();
    }, 2000);
  }

  useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')

      if (authToken) {
          navigate('/')
      }
      if (!authToken) {
          navigate('/login')
      }
  }, [])

  getVehicleData();
  getUserDataLag();

  return (
      <div>
          <h1>Tuul</h1>
          <PairingSwitch label={label} checked={checked} handleChange={handleChangeSwitch} />
          <StartStopToggle title={title} color={color} disabled={disabled} handleChange={handleChangeToggle} />
          <br />
          <br />
          <BasicButton title="Log Out" handleChange={handleLogout} />
      </div>
  )
}

export default Home;