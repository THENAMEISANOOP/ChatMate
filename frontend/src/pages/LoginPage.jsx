import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center px-2">

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-pink-200 flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-pink-500 p-2 rounded-full"
            >
              <MessageSquare className="size-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
              ChatMate
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-pink-700">Welcome Back</h2>
              <p className="text-sm text-pink-500 mt-1">
                Sign in to continue your love journey
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-pink-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-pink-200 mt-3 text-sm"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Sign In
                </>
              )}
            </motion.button>

            {/* Signup Link */}
            <div className="text-center text-sm text-pink-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-rose-600 hover:underline">
                Create one
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center p-4">
          <div className="text-center text-white">
            <div className="relative aspect-square max-w-[150px] mx-auto">
              <img 
                src="/i .png" 
                alt="Couple illustration"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-bold mt-4">Find Your Perfect Match</h2>
            <p className="text-sm text-pink-100 mt-1">
              Connect with like-minded people and start your love story
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
