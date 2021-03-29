import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import {useState} from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import Arrived from './components/Arrived'
import Client from './components/Client';
import AssideMenu from './components/AssideMenu.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';
import Splash from './pages/Splash.js';
import Profile from './pages/Profile.js';

//<>//ini bernama fragmenrt, bisa diganti div juga
function App() {
  const [item, setState ] = useState([]);
  const [statausOffline, setOffline] = useState(!navigator.onLine);
  const [isLoadingSplash, setLoading] = useState(true);
//memiliki 2 parameter , 1 function, 2,dependenci list[]
  React.useEffect(function(){
  (async function(){
    const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',{
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json",
        "x-api-key": process.env.REACT_APP_APIKEY //Unutk menyebunyikan dngn env variabel, agar tidk dibaca digit,
        }
      });
      const {nodes } = await response.json();
      setState(nodes);

      const script = document.createElement("script"); //load script Untuk scrol item, ketika item tidk muat dilaar
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);

      handleStatusOffline();// untuk membaca status online atau tidak
      window.addEventListener('online', handleStatusOffline);
      window.addEventListener('offline', handleStatusOffline);
      return function()
      {
          window.removeEventListener('online', handleStatusOffline);
          window.removeEventListener('offline', handleStatusOffline);
      }

    })();
  },[statausOffline]); //[]

  function handleStatusOffline()
  {
    setOffline(!navigator.onLine);
  }

  setTimeout(function(){
    setLoading(false)
  },2000)

// setelah return( tidk boleh dienter
  return(
    <>
    {
      isLoadingSplash === true ? <Splash/> :
      (
        <>
          {statausOffline && <Offline/>}
          <Header/>
          <Hero/>
          <Browse/>
          <Arrived itemArrived={item}/>
          <Client/>
          <AssideMenu/>
          <Footer/>
        </>
      )}
    </>
  );
}

export default function Routes(){
  return(
    <Router>
      <Route path="/" exact component={App}/>
      <Route path="/Profile" exact component={Profile}/>
    </Router>
  )
};
