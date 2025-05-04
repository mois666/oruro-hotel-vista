
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { floor: '1° Piso', occupied: 8, available: 4 },
  { floor: '2° Piso', occupied: 5, available: 7 },
  { floor: '3° Piso', occupied: 3, available: 9 },
];

interface OccupancyChartProps {
  className?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ocupación por Piso</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="floor" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="occupied" name="Ocupadas" fill="#0F3460" />
            <Bar dataKey="available" name="Disponibles" fill="#E8B74B" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
