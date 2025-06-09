import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // For conditional class names

interface KPICardProps {
  title: string;
  metric: string | number;
  icon?: React.ReactElement; // Expect a JSX element for the icon, e.g., <Users className="h-4 w-4" />
  description?: string;
  trend?: {
    value: string; // e.g., "+5.2%", "-10"
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  metric,
  icon,
  description,
  trend,
  className,
}) => {
  console.log("Rendering KPICard:", title);

  const trendColor = trend?.direction === 'up' ? 'text-green-600' : trend?.direction === 'down' ? 'text-red-600' : 'text-gray-500';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && React.cloneElement(icon, { className: cn("h-4 w-4 text-muted-foreground", icon.props.className) })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">
            {description}
          </p>
        )}
        {trend && (
          <p className={cn("text-xs text-muted-foreground pt-1", trendColor)}>
            {trend.value}
            {trend.direction !== 'neutral' && (trend.direction === 'up' ? " ↑" : " ↓")}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;