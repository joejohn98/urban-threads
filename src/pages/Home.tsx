import { Link } from "react-router-dom";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";

import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { allProducts, isLoading, error, categories } = useProducts();

  const getFeaturedProducts = () => {
    return allProducts
      .filter((product) => Number(product.rating) >= 4.4)
      .slice(0, 5);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="relative px-8 py-16 md:py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Urban Threads
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover amazing products at unbeatable prices. Shop now and enjoy
            exclusive deals!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </div>
      </div>
      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 p-4 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold capitalize">{category}</h3>
              </div>
            </Link>
          ))}
          {error && <p className="text-md text-red-500 mt-5">{error}</p>}
        </div>
      </section>
      {/* Featured Products Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center"
          >
            View All
            <TrendingUp className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {getFeaturedProducts().map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{product.price}
                  </span>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {error && <p className="text-md text-red-500 mt-5">{error}</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
