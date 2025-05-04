
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-2 px-4 md:px-8">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 border-2 border-[#3B82F6] flex items-center justify-center">
            <span className="text-[#3B82F6] font-bold">HO</span>
          </div>
          <span className="text-xl font-semibold text-[#1E40AF]">HOTEL ORURO</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-[#3B82F6] text-[#333333]">Inicio</Link>
          <Link to="/registro" className="hover:text-[#3B82F6] text-[#333333]">Reserva</Link>
          <Link to="/habitaciones" className="hover:text-[#3B82F6] text-[#333333]">Habitaciones</Link>
          <Link to="/ajustes" className="hover:text-[#3B82F6] text-[#333333]">Ajustes</Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-100 h-10 w-10">
            <span className="sr-only">User profile</span>
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
