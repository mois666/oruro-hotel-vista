
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import OccupancyChart from '@/components/dashboard/OccupancyChart';
import RoomStatusCard from '@/components/dashboard/RoomStatusCard';
import GuestSummary from '@/components/dashboard/GuestSummary';
import ActionButtons from '@/components/dashboard/ActionButtons';
import { financialMetrics, guests, rooms } from '@/data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ingresos del Día"
          value={`${financialMetrics.todayRevenue} Bs`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Ingresos del Mes"
          value={`${financialMetrics.monthRevenue} Bs`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Huéspedes Actuales"
          value={guests.length}
        />
        <StatCard
          title="Tasa de Ocupación"
          value={`${financialMetrics.occupancyRate}%`}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <ActionButtons />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyChart />
        <RoomStatusCard rooms={rooms} />
      </div>
      
      <GuestSummary guests={guests} />
    </div>
  );
};

export default Dashboard;
