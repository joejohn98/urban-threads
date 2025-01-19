import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { RootState } from "../store";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { Product } from "../types";

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Handle removing an item from the wishlist
  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  // Handle moving an item from the wishlist to the cart
  const handleMoveToCart = (item: Product) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success("Moved to cart");
  };

  // Render empty wishlist message if no items in wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] rounded-lg ">
        <Heart className="h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Add items to your wishlist to save them for later.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col"
          >
            <div className="relative pt-[100%]">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <Link
                to={`/products/${item.id}`}
                className="block mb-2 flex-grow"
              >
                <h3 className="font-semibold text-base text-gray-900 hover:text-indigo-600 transition-colors duration-300 ease-in-out line-clamp-2">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-indigo-600">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1.5 text-red-500 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-300 ease-in-out"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full flex items-center justify-center px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
              >
                <ShoppingCart className="h-4 w-4 mr-1.5" />
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
