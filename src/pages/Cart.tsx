import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, Heart } from "lucide-react";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { CartItem } from "../types";

const DISCOUNT_CODES = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  SAVE30: 0.3,
};

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      toast.success("Quantity updated");
    }
    if (newQuantity === 0) {
      dispatch(removeFromCart(id));
    }
    if (newQuantity === 10) {
      toast.error("Maximum quantity is 10");
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart");
  };

  const handleMoveToWishlist = (item: CartItem) => {
    dispatch(addToWishlist(item));
    dispatch(removeFromCart(item.id));
    toast.success("Moved to wishlist");
  };

  const handleApplyDiscount = () => {
    const discount =
      DISCOUNT_CODES[discountCode as keyof typeof DISCOUNT_CODES];
    if (discount) {
      setAppliedDiscount(discount);
      toast.success(`Discount applied: ${discount * 100}% off`);
    } else {
      toast.error("Invalid discount code");
    }
  };

  const discountedTotal = total * (1 - appliedDiscount);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="text-indigo-600 hover:text-indigo-500 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
          >
            <div className="w-full sm:w-32 h-32 relative">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <span className="font-bold text-indigo-600">₹{item.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    {item.quantity < 10 ? (
                      <Plus className="h-4 w-4" />
                    ) : (
                      <span className="text-gray-400">Max</span>
                    )}
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMoveToWishlist(item)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{(total * appliedDiscount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{discountedTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Enter discount code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleApplyDiscount}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Apply
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Try these codes: SAVE10, SAVE20, SAVE30
            </p>
          </div>

          <Link
            to="/checkout"
            className="block w-full px-6 py-3 bg-indigo-600 text-white text-center rounded-lg font-semibold hover:bg-indigo-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
