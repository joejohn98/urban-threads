import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import { AppDispatch, RootState } from "../store";

import { addToCart } from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchParams] = useSearchParams();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [priceFilter, setPriceFilter] = useState<number>(0);

  const { products, filters, categories, setFilters, isLoading } =
    useProducts();
  console.log(products);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterByCategory: [...prevFilters.filterByCategory, category],
      }));
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      filterByCategory: prev.filterByCategory.includes(category)
        ? prev.filterByCategory.filter((item) => item !== category)
        : [...prev.filterByCategory, category],
    }));
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(Number(e.target.value));

    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByPriceRange: [0, Number(e.target.value)],
    }));
  };

  const handlePriceSort = (sort: "asc" | "desc") => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByPriceSort: sort,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByRating: rating,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      filterByPriceRange: [0, 1810],
      filterByCategory: [],
      filterByRating: 0,
      filterByPriceSort: "",
      filterBySize: [],
    });
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate("/");
      toast.error("Please login to add to cart!");
      return;
    } else {
      dispatch(addToCart(product));
    }
    toast.success("Added to cart!");
  };

  const handleWishlist = (product: Product) => {
    if (!user) {
      navigate("/login");
      toast.error("Please login to add to wishlist!");
    } else {
      const isInWishlist = wishlistItems.some((item) => item.id === product.id);
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        toast.success("Removed from wishlist!");
      } else {
        dispatch(addToWishlist(product));
        toast.success("Added to wishlist!");
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

  const FiltersSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.filterByCategory.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort by Price</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.filterByPriceSort === "asc"}
              onChange={() => handlePriceSort("asc")}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">Low to High</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              checked={filters.filterByPriceSort === "desc"}
              onChange={() => handlePriceSort("desc")}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2">High to Low</span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.filterByRating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <span className="ml-2">{rating} stars & above</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price</h3>
        <input
          type="range"
          min={0}
          max={1810}
          step={1}
          value={priceFilter}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹{filters.filterByPriceRange[0]}</span>
          <span>₹{filters.filterByPriceRange[1]}</span>
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
        >
          <span className="font-medium">Filters</span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-300 ${
              isMobileFiltersOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isMobileFiltersOpen && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <FiltersSidebar />
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        key="product-list-container"
      >
        {/* Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
          <FiltersSidebar />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={`product-${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
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
                    onClick={() => handleWishlist(product)}
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      wishlistItems.some((item) => item.id === product.id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-opacity-80 transition-colors duration-300`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlistItems.some((item) => item.id === product.id)
                          ? "fill-current"
                          : ""
                      }`}
                    />
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
                      onClick={() => handleAddToCart(product)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
