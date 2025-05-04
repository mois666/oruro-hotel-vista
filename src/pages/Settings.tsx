
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import UserManagement from '@/components/settings/UserManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const roomPriceForm = useForm({
    defaultValues: {
      simplePrice: '100',
      doublePrice: '180',
      suitePrice: '250',
    }
  });

  const discountForm = useForm({
    defaultValues: {
      standardDiscount: '5',
      groupDiscount: '10',
      longStayDiscount: '15',
    }
  });

  const handleRoomPriceSubmit = (data: any) => {
    console.log('Room price data:', data);
    toast.success('Precios actualizados correctamente');
  };

  const handleDiscountSubmit = (data: any) => {
    console.log('Discount data:', data);
    toast.success('Descuentos actualizados correctamente');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ajustes</h1>
      
      <Tabs defaultValue="prices" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="prices">Tarifas y Descuentos</TabsTrigger>
          <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tarifas de Habitaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...roomPriceForm}>
                  <form onSubmit={roomPriceForm.handleSubmit(handleRoomPriceSubmit)} className="space-y-4">
                    <FormField
                      control={roomPriceForm.control}
                      name="simplePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Habitación Simple (Bs/noche)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={roomPriceForm.control}
                      name="doublePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Habitación Doble (Bs/noche)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={roomPriceForm.control}
                      name="suitePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suite (Bs/noche)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="bg-hotel-blue hover:bg-hotel-darkBlue w-full">
                      Guardar Cambios
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Descuentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...discountForm}>
                  <form onSubmit={discountForm.handleSubmit(handleDiscountSubmit)} className="space-y-4">
                    <FormField
                      control={discountForm.control}
                      name="standardDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descuento Estándar (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={discountForm.control}
                      name="groupDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descuento para Grupos (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={discountForm.control}
                      name="longStayDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descuento Estancia Prolongada (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="bg-hotel-blue hover:bg-hotel-darkBlue w-full">
                      Guardar Cambios
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
