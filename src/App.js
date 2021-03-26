import React from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import Arrived from './components/Arrived'
import Client from './components/Client';
import AssideMenu from './components/AssideMenu'
import Footer from './components/Footer'
//<>//ini bernama fragmenrt, bisa diganti div juga
function App() {
  return (
    <>
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived/>
    <Client/>
    <AssideMenu/>
    <Footer/>
    </>
  );
}

export default App;
