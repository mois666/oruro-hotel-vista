
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '../theme/ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-2 px-4 md:px-8 dark:bg-hotel-darkCard dark:border-b dark:border-hotel-darkBorder">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* <div className="h-10 w-10 border-2 border-[#3B82F6] flex items-center justify-center dark:border-hotel-blue">
            <span className="text-[#3B82F6] font-bold dark:text-hotel-blue">HO</span>
          </div> */}
          {/* <span className="text-xl font-semibold text-[#1E40AF] dark:text-hotel-blue">HOTEL ORURO</span> */}
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-[#3B82F6] text-[#333333] dark:text-hotel-darkText dark:hover:text-hotel-blue">Inicio</Link>
          <Link to="/registro" className="hover:text-[#3B82F6] text-[#333333] dark:text-hotel-darkText dark:hover:text-hotel-blue">Reserva</Link>
          <Link to="/habitaciones" className="hover:text-[#3B82F6] text-[#333333] dark:text-hotel-darkText dark:hover:text-hotel-blue">Habitaciones</Link>
          <Link to="/ajustes" className="hover:text-[#3B82F6] text-[#333333] dark:text-hotel-darkText dark:hover:text-hotel-blue">Ajustes</Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 h-10 w-10 dark:bg-gray-800">
            <span className="sr-only">User profile</span>
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center dark:bg-gray-700">
              <span className="text-sm">👤</span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
