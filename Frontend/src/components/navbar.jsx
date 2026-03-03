import React, { useState } from 'react';
import Logo from './logo';


const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Logo />
      <nav className="fixed top-4 right-4 bg-black text-white px-6 py-3 shadow-md rounded-2xl z-50">
        {/* Bouton hamburger visible seulement sur mobile */}
        <div className="flex justify-between items-center md:hidden ">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none"
          >
            {/* Icône hamburger */}
            <svg
              className="w-6 h-6 text-white hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu principal */}
        <ul
          className={`${
            open ? "flex" : "hidden"
          } flex-col gap-4 mt-4 md:mt-0 md:flex md:flex-row md:gap-6 text-xl font-medium items-start md:items-center`}
        >
          <li>
            <a href="/" className="hover:text-red-600 transition font-cursive focus:outline-none">
              Accueil
            </a>
          </li>
          <li>
            <a href="#rating" className="hover:text-red-600 transition font-cursive focus:outline-none">
              Rating
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-red-600 transition font-cursive focus:outline-none">
              Menu
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-red-600 transition font-cursive focus:outline-none">
              Contact
            </a>
          </li>
          <li>
            <a href="#equipage" className="hover:text-red-600 transition font-cursive focus:outline-none">
              Équipage
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
