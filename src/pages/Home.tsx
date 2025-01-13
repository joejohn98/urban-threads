import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
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

        <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold">Popular Categories</h2>
            <p className="text-gray-500">
            Discover the best products from our top categories.
            </p>
        </div>
    </div>
  );
};

export default Home;
