import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { RootState } from "../store";
import { clearCart } from "../store/slices/cartSlice";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import OrderSummary from "../components/checkout/OrderSummary";
import toast from "react-hot-toast";

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState(1); // Step state to track the current step in the checkout process

  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  // Handle submission of the shipping address form
  const handleAddressSubmit = (address: Address) => {
    setShippingAddress(address);
    setStep(2); // Move to the next step (Payment)
  };

  // Handle submission of the payment form
  const handlePaymentSubmit = (payment: PaymentMethod) => {
    setPaymentMethod(payment);
    setStep(3); // Move to the next step (Review)
  };

  // Handle placing the order
  const handlePlaceOrder = () => {
    dispatch(clearCart()); // Clear the cart
    toast.success("Order placed successfully!"); // Show success message
    navigate("/order-confirmation"); // Navigate to the order confirmation page
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`flex items-center ${
              step >= 1 ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            <MapPin className="h-6 w-6" />
            <span className="ml-2 font-semibold">Shipping</span>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${
                step >= 2 ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          </div>
          <div
            className={`flex items-center ${
              step >= 2 ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            <CreditCard className="h-6 w-6" />
            <span className="ml-2 font-semibold">Payment</span>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div
              className={`h-full ${
                step >= 3 ? "bg-indigo-600" : "bg-gray-200"
              }`}
            />
          </div>
          <div
            className={`flex items-center ${
              step >= 3 ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            <Truck className="h-6 w-6" />
            <span className="ml-2 font-semibold">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && <AddressForm onSubmit={handleAddressSubmit} />}{" "}
          {/* Render AddressForm if step is 1 */}
          {step === 2 && <PaymentForm onSubmit={handlePaymentSubmit} />}{" "}
          {/* Render PaymentForm if step is 2 */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 className="text-2xl font-bold">Order Review</h2>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  {shippingAddress && (
                    <>
                      <p>{shippingAddress.fullName}</p>
                      <p>{shippingAddress.street}</p>
                      <p>
                        {shippingAddress.city}, {shippingAddress.state}{" "}
                        {shippingAddress.zipCode}
                      </p>
                      <p>{shippingAddress.phone}</p>
                    </>
                  )}
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  {paymentMethod && (
                    <>
                      <p>•••• •••• •••• {paymentMethod.cardNumber.slice(-4)}</p>
                      <p>{paymentMethod.cardHolder}</p>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                Place Order
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} total={total} />{" "}
          {/* Render OrderSummary */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
