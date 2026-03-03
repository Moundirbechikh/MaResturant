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
      {/* Section Hero */}
      <div 
        className="min-h-screen bg-center bg-no-repeat bg-cover flex flex-col"
        style={{ backgroundImage: "url('../back1.png')" }}
      >
        <Navbar />
        <Citation />
      </div>

      {/* Contenu principal */}
      <div className="bg-black flex flex-col space-y-12">
          <Appmenu />
        <Rate />
        
        <About />
        <Secretform />
        <Foot />
      </div>
    </>
  );
};

export default Homepage;
