
import React, { useState } from 'react';
import { rooms as mockRooms } from '@/data/mockData';
import { Room } from '@/types';
import RoomGrid from '@/components/rooms/RoomGrid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const RoomManagement = () => {
  const [rooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };
  
  const handleCloseDialog = () => {
    setSelectedRoom(null);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
      </div>
      
      <Dialog open={!!selectedRoom} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Habitación #{selectedRoom?.number}</DialogTitle>
            <DialogDescription>
              {selectedRoom?.type} - Piso {selectedRoom?.floor}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-2"><strong>Estado:</strong> {selectedRoom?.status}</p>
            <p className="mb-2"><strong>Precio:</strong> {selectedRoom?.price} Bs/noche</p>
            <p className="mb-2"><strong>Capacidad:</strong> {selectedRoom?.capacity} persona(s)</p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCloseDialog}>
              Cerrar
            </Button>
            <Button className="bg-hotel-blue hover:bg-hotel-darkBlue">
              Editar Habitación
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagement;
