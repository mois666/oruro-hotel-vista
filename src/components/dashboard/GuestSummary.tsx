
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Guest } from '@/types';
import { format } from 'date-fns';

interface GuestSummaryProps {
  guests: Guest[];
  className?: string;
}

const GuestSummary: React.FC<GuestSummaryProps> = ({ guests, className }) => {
  const recentGuests = guests.slice(0, 5);
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Huéspedes Recientes</CardTitle>
        <span className="text-sm text-muted-foreground">{guests.length} total</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentGuests.map((guest) => (
            <div key={guest.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-hotel-lightBlue flex items-center justify-center text-hotel-blue font-medium">
                  {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{guest.firstName} {guest.lastName}</p>
                  <p className="text-sm text-muted-foreground">Habitación {guest.roomNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{format(new Date(guest.checkIn), 'dd/MM/yyyy')}</p>
                <p className="text-sm text-muted-foreground">al {format(new Date(guest.checkOut), 'dd/MM/yyyy')}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestSummary;
