import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge"; // Using shadcn Badge as base
import { cn } from "@/lib/utils";

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'on-hold'
  | 'failed';

interface OrderStatusBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  status: OrderStatus | string; // Allow string for flexibility, but map known statuses
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className, ...props }) => {
  console.log("Rendering OrderStatusBadge for status:", status);

  const normalizedStatus = status.toLowerCase() as OrderStatus;

  let variant: BadgeProps['variant'] = 'default';
  let statusText = status.charAt(0).toUpperCase() + status.slice(1);

  switch (normalizedStatus) {
    case 'pending':
      variant = 'secondary'; // Yellowish/Orange typically
      statusText = 'Pending';
      className = cn("bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200", className);
      break;
    case 'processing':
      variant = 'default'; // Blueish typically
      statusText = 'Processing';
      className = cn("bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200", className);
      break;
    case 'shipped':
      variant = 'default'; // Another blue or distinct color
      statusText = 'Shipped';
      className = cn("bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200", className);
      break;
    case 'delivered':
      variant = 'default'; // Green typically
      statusText = 'Delivered';
      className = cn("bg-green-100 text-green-800 border-green-300 hover:bg-green-200", className);
      break;
    case 'cancelled':
      variant = 'destructive'; // Red typically
      statusText = 'Cancelled';
      // destructive variant from shadcn might be good enough, or customize:
      // className = cn("bg-red-100 text-red-800 border-red-300 hover:bg-red-200", className);
      break;
    case 'refunded':
      variant = 'outline'; // Grey/neutral typically
      statusText = 'Refunded';
      className = cn("bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200", className);
      break;
    case 'on-hold':
      variant = 'secondary';
      statusText = 'On Hold';
      className = cn("bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200", className);
      break;
    case 'failed':
      variant = 'destructive';
      statusText = 'Failed';
      break;
    default:
      // For unknown statuses, use default styling
      variant = 'outline';
      statusText = status.charAt(0).toUpperCase() + status.slice(1); // Capitalize first letter
      break;
  }

  return (
    <Badge variant={variant} className={cn(className)} {...props}>
      {statusText}
    </Badge>
  );
};

export default OrderStatusBadge;