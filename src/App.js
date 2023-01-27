import React from "react";
import LoginAuth from "./components/LoginAuth";
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "@googlemaps/js-api-loader"


function App() {

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
    const tuulMarker = "tuulmarker2.png"
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

  return (
      <div>
        <>
          <LoginAuth />
        </>   
      </div>
  );
}

export default App;