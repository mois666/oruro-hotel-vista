
import React, { useState } from 'react';
import { guests as mockGuests } from '@/data/mockData';
import { Guest } from '@/types';
import GuestList from '@/components/guest/GuestList';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GuestsPage = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  
  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };
  
  const handleEditGuest = (guest: Guest) => {
    // In a real app, this would open an edit form
    console.log('Editing guest:', guest);
  };
  
  const handleAddGuest = () => {
    navigate('/registro');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Huéspedes</h1>
        <Button onClick={handleAddGuest} className="bg-hotel-blue hover:bg-hotel-darkBlue">
          <PlusCircle className="mr-2 h-4 w-4" />
          Registrar Huésped
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <GuestList 
          guests={guests}
          onDelete={handleDeleteGuest}
          onEdit={handleEditGuest}
        />
      </div>
    </div>
  );
};

export default GuestsPage;
