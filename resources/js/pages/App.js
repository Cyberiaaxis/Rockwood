import React from 'react';
import Header from "../components/Header";
// import Slider from "../components/Slider";
import Lists from "../components/Lists";
import Footer from "../components/Footer";


const App = () => {
  console.log('App.js rendering')

  return (<>
    <Header />
    {/* <Slider/> */}
    <Lists />
  </>)
}
export default App;
