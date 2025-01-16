import { Link } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

const OrderConfirmation = () => {
  const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
        <p className="text-lg text-gray-600">
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-mono font-bold text-gray-900">
            #{orderNumber}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            We'll send you a confirmation email with your order details and
            tracking information.
          </p>

          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Package className="h-5 w-5" />
            <span>Estimated delivery: 3-5 business days</span>
          </div>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
