import React, { useEffect, useState } from 'react'
import { useNavigate, Switch, Route, Link } from 'react-router-dom'
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import {nanoid} from "nanoid";
import { db } from './firebase-config';
import Pair from './components/Pair';
import { getFirestore, collection, getDocs, doc, getDoc, firestore, updateDoc } from 'firebase/firestore';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';


const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
};
  
const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {
    
    const userData = doc(db, "users", "3ce3P4H3K1e7KarRe9fHNwdajQf1");
    const userDocSnap = getDoc(userData);

    getDoc(doc(db, "users", "3ce3P4H3K1e7KarRe9fHNwdajQf1")).then(userDocSnap => {
        if (userDocSnap.exists()) {
          console.log("Document data:", userDocSnap.data());
        } else {
          console.log("No such document!");
        }
    })

    const vehicleData = doc(db, "vehicles", "code1");
    const vehicleDocSnap = getDoc(vehicleData);

    getDoc(doc(db, "vehicles", "aaaaaaaaaaaaaaaa")).then(vehicleDocSnap => {
        if (vehicleDocSnap.exists()) {
          console.log("Document data:", vehicleDocSnap.data());
        } else {
          console.log("No such document!");
        }
    })


    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

  
    function addTask(name) {
      const newTask = {id: `todo-${nanoid()}`, name, completed: false };
      setTasks([...tasks, newTask]);
    }
  
    function toggleTaskCompleted(id) {
      const updatadTasks = tasks.map((task) => {
        if (id === task.id) {
          return {...task, completed: !task.completed};
        }
        return task;
      })
      setTasks(updatadTasks);
    }
  
    function deleteTask(id) {
      const remainingTasks = tasks.filter((task) => id !== task.id);
      setTasks(remainingTasks);
    }
  
    function editTask(id, newName) {
      const editedList = tasks.map((task) => {
        if (id === task.id) {
          return {...task, name: newName};
        }
        return task;
      })
      setTasks(editedList);
    }
    
  
    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id} 
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  
    const filterList = FILTER_NAMES.map((name) => (
      <FilterButton 
        key={name} 
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    ));
  
    const navigate = useNavigate();

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login');
    }




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



    const displayIdToken = () => {
      getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        console.log(idToken);
      }).catch(function(error) {
        console.log(error);
      });
    }

    const getUserData = () => {
      const userData = doc(db, "users", "3ce3P4H3K1e7KarRe9fHNwdajQf1");
      const userDocSnap = getDoc(userData);
  
      getDoc(doc(db, "users", "3ce3P4H3K1e7KarRe9fHNwdajQf1")).then(userDocSnap => {
          if (userDocSnap.exists()) {
            console.log("Document data:", userDocSnap.data());
          } else {
            console.log("No such document!");
          }
      })
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

    return (
        <div className="todoapp stack-large">
            Home Page

            <br /><button onClick={pairScooter}>Pair</button>
            <br /><button onClick={unpairScooter}>Unpair</button>
            <br /><button onClick={displayIdToken}>Get ID Token</button>
            <br /><button onClick={getUserData}>Get User Data</button>
            <br /><button onClick={startScooter}>Start</button>
            <br /><button onClick={stopScooter}>Stop</button>
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home;