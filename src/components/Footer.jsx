import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-3">Food Zone</h2>
          <p className="text-sm">
            Delivering delicious moments, one plate at a time.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-md font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
            <li><Link to="/menu" className="hover:text-orange-600">Menu</Link></li>
            <li><Link to="/about" className="hover:text-orange-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-md font-semibold mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>Salads</li>
            <li>Burgers</li>
            <li>Desserts</li>
            <li>Drinks</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-2">Get in Touch</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: support@yourbrand.com</li>
            <li>Phone: +91 12345 67890</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
