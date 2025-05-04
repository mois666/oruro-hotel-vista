
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-hotel-mediumGray">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-hotel-mediumGray">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-hotel-darkGray">{value}</div>
        {description && <p className="text-xs text-hotel-mediumGray mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={`text-xs ${
                trend.isPositive ? 'text-hotel-positive' : 'text-hotel-negative'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-xs text-hotel-mediumGray ml-1">del mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
