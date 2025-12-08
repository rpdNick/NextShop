import { motion } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

type NavbarProps = {
  onClose: () => void;
};

const Navbar = ({ onClose }: NavbarProps) => {
  return (
    <>
      <motion.div
        className="navbar-backdrop fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="navbar fixed top-0 left-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-lg p-4"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold">Menu</span>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        {/* TODO: replace with real navigation links */}
        <nav className="space-y-2">
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            Home
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            Shop
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            Blog
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            About us
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            Contact
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-primary">
            My Account
          </button>
        </nav>
      </motion.div>
    </>
  );
};

export default Navbar;