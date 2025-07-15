import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-10 mt-12">
      <div className="w-11/12 max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-6 border-b border-gray-700 pb-6">
        
        {/* Project Info */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-semibold text-lg">Smart City</h2>
          <p>Empowering citizens to report and track urban issues efficiently with transparency and speed.</p>
          <div className="flex gap-3 text-lg mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/complaint/new" className="hover:text-white">Register Complaint</Link>
          <Link to="/complaints/my" className="hover:text-white">My Complaints</Link>
          <Link to="/profile" className="hover:text-white">Profile</Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Resources</h3>
          <Link to="/help-center" className="hover:text-white">Help Center</Link>
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
        </div>
      </div>

      <div className="w-11/12 max-w-6xl mx-auto mt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Smart City · Made with ❤️ by Deepak Pandey
      </div>
    </footer>
  );
};

export default Footer;
