import React from 'react';
import logoBurger from '../assets/logo1.jpg';

      
const Logo = () => {
  return (   
     
<div className="text-white px-6 py-1 w-fit rounded-2xl ml-4 pt-5 h-fit flex justify-start gap-4">
<img src={logoBurger} alt="Logo Burger" className="sm:h-24 sm:w-24 h-20 w-20 object-contain" />
</div>

  );
};

export default Logo;



