import { Link } from "react-router-dom";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import { Home, LayoutDashboard, MapPin } from "lucide-react";
import { fetchPins } from "../api";

const Navbar = () => {
  const { isSignedIn } = useUser();

  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                TrailSafe
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
              </Link>
              {isSignedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <LayoutDashboard className="h-5 w-5 mr-1" />
                    Dashboard
                  </Link>
                  <Link
                    to="/pins"
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    <MapPin className="h-5 w-5 mr-1" />
                    Pins
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
