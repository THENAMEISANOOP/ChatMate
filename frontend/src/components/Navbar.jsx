import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="bg-pink-300 border-b border-pink-400 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-pink-200 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-pink-600" />
            </div>
            <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500 tracking-wider">
              ChatMate
            </span>
          </Link>

          {/* Right-side controls */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">

            <Link to="/settings">
              <button className="btn btn-ghost btn-sm gap-2">
                <Settings className="w-4 h-4 text-white opacity-70" />
                <span className="hidden sm:inline text-white">Settings</span>
              </button>
            </Link>

            {authUser && (
              <>
                <Link to="/profile">
                  <button className="btn btn-ghost btn-sm gap-2">
                    <User className="w-4 h-4 text-white opacity-70" />
                    <span className="hidden sm:inline text-white">Profile</span>
                  </button>
                </Link>

                <button className="btn btn-ghost btn-sm gap-2" onClick={logout}>
                  <LogOut className="w-4 h-4 text-white opacity-70" />
                  <span className="hidden sm:inline text-white">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
