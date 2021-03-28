import React from 'react';
import {useState} from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import Arrived from './components/Arrived'
import Client from './components/Client';
import AssideMenu from './components/AssideMenu'
import Footer from './components/Footer'
//<>//ini bernama fragmenrt, bisa diganti div juga
function App() {
  const [item, setState ] = useState([]);
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
    })();
  },[]);

  return (
    <>
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived itemArrived={item}/> //menmpilkan data
    <Client/>
    <AssideMenu/>
    <Footer/>
    </>
  );
}

export default App;
