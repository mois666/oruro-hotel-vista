
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Correctly import the Spanish locale

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Room, RoomType } from '@/types';
import { rooms } from '@/data/mockData';
import { toast } from 'sonner';

const formSchema = z.object({
  documentId: z.string().min(5, 'El CI/DNI debe tener al menos 5 caracteres'),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().min(7, 'El número de teléfono debe tener al menos 7 caracteres'),
  roomType: z.enum([RoomType.SIMPLE, RoomType.DOUBLE, RoomType.SUITE]),
  roomNumber: z.string().min(1, 'Debe seleccionar una habitación'),
  checkIn: z.date(),
  checkOut: z.date(),
  discount: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GuestRegistrationFormProps {
  onSubmitSuccess?: () => void;
}

const GuestRegistrationForm: React.FC<GuestRegistrationFormProps> = ({ onSubmitSuccess }) => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [total, setTotal] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentId: '',
      firstName: '',
      lastName: '',
      phone: '',
      roomType: RoomType.SIMPLE,
      roomNumber: '',
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      discount: '0',
    },
  });

  const roomType = form.watch('roomType');
  const checkIn = form.watch('checkIn');
  const checkOut = form.watch('checkOut');
  const roomNumber = form.watch('roomNumber');
  const discount = form.watch('discount');

  // Filter available rooms whenever room type changes
  React.useEffect(() => {
    if (roomType) {
      const filtered = rooms.filter(
        (room) => room.type === roomType
      );
      setAvailableRooms(filtered);
    }
  }, [roomType]);

  // Calculate total whenever relevant fields change
  React.useEffect(() => {
    if (roomNumber && checkIn && checkOut) {
      const selectedRoom = rooms.find((r) => r.number.toString() === roomNumber);
      if (selectedRoom) {
        const pricePerNight = selectedRoom.price;
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalBeforeDiscount = pricePerNight * diffDays;
        const discountAmount = parseInt(discount || '0', 10);
        const finalTotal = totalBeforeDiscount * (1 - discountAmount / 100);
        setTotal(finalTotal);
      }
    }
  }, [roomNumber, checkIn, checkOut, discount]);

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    toast.success('Reserva registrada con éxito!', {
      description: `${data.firstName} ${data.lastName} - Habitación ${data.roomNumber}`
    });
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registro de Cliente</CardTitle>
        <CardDescription>Ingrese los datos del huésped para crear una nueva reserva</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CI/DNI</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="555-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Carlos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez Gómez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de habitación</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={RoomType.SIMPLE}>Simple</SelectItem>
                        <SelectItem value={RoomType.DOUBLE}>Doble</SelectItem>
                        <SelectItem value={RoomType.SUITE}>Suite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habitación</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={availableRooms.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una habitación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableRooms.map((room) => (
                          <SelectItem key={room.id} value={room.number.toString()}>
                            #{room.number} - Piso {room.floor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha Inicio</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={es}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha Fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            (checkIn && date <= checkIn)
                          }
                          initialFocus
                          locale={es}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        placeholder="0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2">Sub Total</span>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground font-semibold">
                  {total.toFixed(2)} Bs
                </div>
              </div>
            </div>

            <CardFooter className="px-0 pt-6">
              <Button 
                type="submit" 
                className="bg-hotel-blue hover:bg-hotel-darkBlue w-full"
              >
                REGISTRAR RESERVA
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GuestRegistrationForm;
