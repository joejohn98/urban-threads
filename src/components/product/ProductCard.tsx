import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${
        !product.in_stock ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="relative pt-[100%]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </Link>
        {product.trending && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-900">
            Trending
          </span>
        )}
        <button
          onClick={() => onAddToWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          } hover:bg-opacity-80 transition-colors duration-300`}
        >
          <Heart className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-indigo-600 transition-colors duration-300">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xl font-bold text-indigo-600 mr-2">
              ₹{product.price}
            </span>
            {product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.original_price}
              </span>
            )}
          </div>
          <div className="flex items-center text-yellow-400">
            <Star className="h-5 w-5 fill-current" />
            <span className="ml-1 text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <span className="mr-4">Size: {product.size}</span>
          <span>Delivery: {product.delivery_time}</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full flex items-center justify-center px-4 py-2 ${
              product.in_stock
                ? " bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                : "border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            }`}
            disabled={!product.in_stock}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.in_stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
