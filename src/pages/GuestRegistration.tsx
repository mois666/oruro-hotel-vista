
import React from 'react';
import GuestRegistrationForm from '@/components/guest/GuestRegistrationForm';
import GuestList from '@/components/guest/GuestList';
import { guests as mockGuests } from '@/data/mockData';
import { Guest } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestRegistration = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  
  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };
  
  const handleEditGuest = (guest: Guest) => {
    // In a real app, this would open an edit form
    console.log('Editing guest:', guest);
  };
  
  const handleRegistrationSuccess = () => {
    // In a real app, we would add the new guest to the list
    navigate('/');
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Registro de Huéspedes</h1>
      
      <GuestRegistrationForm onSubmitSuccess={handleRegistrationSuccess} />
      
      <GuestList 
        guests={guests}
        onDelete={handleDeleteGuest}
        onEdit={handleEditGuest}
      />
    </div>
  );
};

export default GuestRegistration;
