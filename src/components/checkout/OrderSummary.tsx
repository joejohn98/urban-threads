import React from "react";
import { CartItem } from "../../types";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  const shipping: number = 0; // Free shipping
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-6">
            <div className="w-24 h-24 relative">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-fill border rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (10%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
