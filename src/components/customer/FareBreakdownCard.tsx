import React from 'react';
import { FareBreakdown } from '../../types';

interface FareBreakdownCardProps {
  fare: FareBreakdown;
  vehicleName: string;
  vehicleModel?: string;
  currencySymbol?: string;
  className?: string;
}

export const FareBreakdownCard: React.FC<FareBreakdownCardProps> = ({
  fare,
  vehicleName,
  vehicleModel,
  currencySymbol = '₹',
  className = '',
}) => {
  return (
    <div className={`p-5 rounded-2xl bg-navy-950 text-ivory-100 border border-navy-800 ${className}`}>
      <div className="pb-3 border-b border-navy-800 mb-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-mint-300">
          Estimated Itemized Fare
        </span>
        <h4 className="text-base font-bold text-ivory-100">{vehicleName}</h4>
        {vehicleModel && <div className="text-[11px] text-ivory-300/80">{vehicleModel}</div>}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-ivory-300">
          <span>Base Fare</span>
          <span>{currencySymbol}{fare.baseFare.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-ivory-300">
          <span>Distance Charge ({fare.estimatedDistance})</span>
          <span>{currencySymbol}{fare.distanceFare.toFixed(2)}</span>
        </div>
        {fare.tollsAndParking > 0 && (
          <div className="flex justify-between text-ivory-300">
            <span>Fastag Toll & Airport Access</span>
            <span>{currencySymbol}{fare.tollsAndParking.toFixed(2)}</span>
          </div>
        )}
        {fare.driverAllowance > 0 && (
          <div className="flex justify-between text-ivory-300">
            <span>Driver Highway Allowance</span>
            <span>{currencySymbol}{fare.driverAllowance.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-ivory-300">
          <span>Transport GST (5%)</span>
          <span>{currencySymbol}{fare.taxesAndGst.toFixed(2)}</span>
        </div>
        {fare.discount > 0 && (
          <div className="flex justify-between text-mint-300 font-bold">
            <span>Coupon Discount</span>
            <span>-{currencySymbol}{fare.discount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-navy-800 flex justify-between items-baseline text-sm font-black text-ivory-100">
          <span>Total Indicative Amount</span>
          <span className="text-mint-300 text-lg">
            {currencySymbol}{fare.totalFare.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

