import React from "react";
import Navbar from "../components/navbar";
import Citation from "../components/Citation";
import About from "../components/About";
import Rate from "../components/Rate";
import Foot from "../components/Foot";
import Appmenu from "../components/appmenu";
import Secretform from "../components/Secretform";


const Homepage = () => {
    return (
        <>
        <div className="h-screen bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('../back1.png')" }}>
        <Navbar/>
        <Citation/>
        </div>
        <div className="bg-black">
        <Rate/>
        <Appmenu/>
        <About/>
        <Secretform/>
        <Foot/>
        </div>
        </>
    );
  };
  
  export default Homepage;