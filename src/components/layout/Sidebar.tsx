
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-hotel-darkBlue text-white dark:bg-blue-900" 
          : "text-sidebar-foreground/90 hover:bg-hotel-darkBlue/80 hover:text-white dark:hover:bg-blue-900/80"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      href: '/', 
      icon: '📊', 
      label: 'Dashboard' 
    },
    { 
      href: '/registro', 
      icon: '📝', 
      label: 'Registro' 
    },
    { 
      href: '/huespedes', 
      icon: '👥', 
      label: 'Huéspedes' 
    },
    { 
      href: '/habitaciones', 
      icon: '🏨', 
      label: 'Habitaciones' 
    },
    { 
      href: '/ajustes', 
      icon: '⚙️', 
      label: 'Ajustes' 
    },
  ];

  return (
    <div className="bg-[#2D3748] flex flex-col w-60 h-screen py-6 dark:bg-[#111827]">
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="h-8 w-8 border-2 border-white flex items-center justify-center">
            <span className="text-white font-bold text-xs">HO</span>
          </div>
          <span>Hotel Oruro</span>
        </h2>
      </div>
      
      <div className="flex-1 px-2">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.href}
          />
        ))}
      </div>
      
      <div className="px-4 mt-auto">
        <div className="bg-[#1E3A8A] rounded-lg p-4 text-white text-sm dark:bg-[#0F172A]">
          <p className="font-medium">Hotel Oruro</p>
          <p className="text-xs text-white/70">Sistema de gestión v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
