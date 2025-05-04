
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild variant="default" className="bg-[#2563EB] text-white hover:bg-[#1E40AF] h-16">
            <Link to="/registro">
              <span className="text-lg mr-2">📝</span>
              <span>Registrar Huésped</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#EFF6FF] h-16">
            <Link to="/habitaciones">
              <span className="text-lg mr-2">🏨</span>
              <span>Ver Habitaciones</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#9CA3AF] text-[#666666] hover:bg-gray-50 h-16">
            <Link to="/huespedes">
              <span className="text-lg mr-2">📊</span>
              <span>Ver Reportes</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
