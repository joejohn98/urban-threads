import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-lg mt-auto border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
              Urban Threads
            </h3>
            <p className="text-gray-600 mb-4">
              Your one-stop destination for quality products and exceptional
              shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={18} />
                <span>123 Shopping Street, Mumbai 400001</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={18} />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6">
          <div className="text-center text-gray-600">
            <p>&copy; {currentYear} Urban Threads. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
