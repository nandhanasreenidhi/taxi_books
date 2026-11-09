import React from 'react';
import { BookingStatus } from '../../types';

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'active':
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full bg-mint-100 text-mint-900 border border-mint-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
          Active Trip
        </span>
      );
    case 'upcoming':
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-navy-100 text-navy-900 border border-navy-300 ${className}`}
        >
          Upcoming
        </span>
      );
    case 'completed':
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-700 border border-charcoal-200 ${className}`}
        >
          Completed
        </span>
      );
    case 'cancelled':
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          Cancelled
        </span>
      );
    default:
      return null;
  }
};

