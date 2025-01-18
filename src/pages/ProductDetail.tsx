import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { AppDispatch, RootState } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";

import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { allProducts, isLoading } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find((item) => item.id === id);
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: location.pathname } } });
      toast.error("Please login to add to cart!");
      return;
    } else {
      if (product) {
        dispatch(addToCart({ ...product, quantity }));
        toast.success("Added to cart!");
        navigate("/cart");
      }
    }
  };

  const handleWishlist = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: location.pathname } } });
      toast.error("Please login to add to wishlist!");
    } else {
      if (product) {
        if (isInWishlist) {
          dispatch(removeFromWishlist(product.id));
          toast.success("Removed from wishlist!");
        } else {
          dispatch(addToWishlist(product));
          toast.success("Added to wishlist!");
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Product Image */}
        <div className="aspect-square relative bg-gray-100 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-8"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 text-gray-600">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">₹{product.price}</span>
            <span className="text-xl text-gray-500 line-through">
              ₹{product.original_price}
            </span>
            <span className="text-lg text-green-600">
              {Math.round(
                ((product.original_price - product.price) /
                  product.original_price) *
                  100
              )}
              % OFF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Description:</span>
            <span>{product.description}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Size:</span>
            <span>{product.size}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Delivery:</span>
            <span>{product.delivery_time}</span>
          </div>

          <div className="flex items-center space-x-4">
            {product.in_stock && (
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-16 text-center border-x border-gray-300 py-2"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md ${
                product.in_stock
                  ? " bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  : "border border-gray-300 text-gray-600 pointer-events-none"
              }`}
              disabled={!product.in_stock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.in_stock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              onClick={handleWishlist}
              className={`px-6 py-3 rounded-lg flex items-center ${
                isInWishlist
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              } hover:bg-opacity-80`}
            >
              <Heart
                className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
