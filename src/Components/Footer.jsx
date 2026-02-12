import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Artha</h2>
          <p className="text-sm">
            Empowering students with career readiness tools and
            personalized growth strategies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-white hover:underline cursor-pointer">Home</li>
            <li className="hover:text-white hover:underline cursor-pointer">About</li>
            <li className="hover:text-white hover:underline cursor-pointer">Services</li>
            <li className="hover:text-white hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2">
            <li className="hover:text-white hover:underline cursor-pointer">
              Career Assessment
            </li>
            <li className="hover:text-white hover:underline cursor-pointer">
              Skill Gap Analysis
            </li>
            <li className="hover:text-white hover:underline cursor-pointer">
              Career Roadmap
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@artha.com</p>
          <p className="text-sm mb-4">Phone: +91 98765 43210</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-3">
            <FaFacebookF className="hover:text-white cursor-pointer transition duration-300" />
            <FaInstagram className="hover:text-white cursor-pointer transition duration-300" />
            <FaLinkedinIn className="hover:text-white cursor-pointer transition duration-300" />
            <FaTwitter className="hover:text-white cursor-pointer transition duration-300" />
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Artha. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
