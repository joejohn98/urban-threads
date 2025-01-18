import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { AppDispatch, RootState } from "../store";

import { addToCart } from "../store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";
import ProductFilters from "../components/product/ProductFilters";
import ProductCard from "../components/product/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const {
    products,
    filters,
    categories,
    setFilters,
    isLoading,
    error,
    pagination,
  } = useProducts();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prev) => ({
        ...prev,
        filterByCategory: [category],
      }));
    }
  }, [searchParams]);

  

  const handleAddToCart = (product: Product) => {
    if (!user) {
      navigate("/login");
      toast.error("Please login to add to cart!");
      return;
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Added to cart!");
    }
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

  const handleClearFilters = () => {
    setFilters({
      filterByPriceRange: [0, 1810],
      filterByCategory: [],
      filterByRating: 0,
      filterByPriceSort: "",
      filterBySize: [],
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg font-bold text-gray-900">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>

      <div className="lg:hidden mb-4">
        <button
          onClick={() => {
            setIsMobileFiltersOpen(!isMobileFiltersOpen);
          }}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
        >
          <span className="font-medium">Filters</span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-300`}
          />
        </button>
        {isMobileFiltersOpen && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <ProductFilters
              categories={categories}
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        key="product-list-container"
      >
        {/* Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleWishlist}
                isInWishlist={wishlistItems.some(
                  (item) => item.id === product.id
                )}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={pagination.previousPage}
              disabled={pagination.currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                pagination.currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              } transition-colors duration-300`}
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => pagination.goToPage(pageNumber)}
                  className={`w-8 h-8 rounded-lg ${
                    pageNumber === pagination.currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } transition-colors duration-300`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={pagination.nextPage}
              disabled={pagination.currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg ${
                pagination.currentPage === pagination.totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              } transition-colors duration-300`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
