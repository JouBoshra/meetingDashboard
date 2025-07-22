import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Lock, Shield, Eye, EyeOff, User } from "lucide-react";
import Logo from "../../assets/Brain-Health-USA-Center_white-png(1).webp";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // Security delay to prevent brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (username === "BrainHealth" && password === "GodIsLove") {
      // Store authentication state with expiration (24 hours)
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authExpiration", expirationTime.toString());
      localStorage.setItem("authenticatedUser", username);

      onLogin(true);
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Company Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <img
              src={Logo}
              alt="Brain Health USA Center"
              className="h-20 w-auto mx-auto mb-4 filter brightness-0 invert"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Meeting Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-blue-100"
          >
            Secure Access Portal
          </motion.p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Secure Login
            </CardTitle>
            <CardDescription className="text-blue-100">
              Enter your credentials to access the meeting dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-blue-200 focus:border-white/50"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-blue-200 focus:border-white/50 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-100 px-4 py-2 rounded-md text-sm"
                >
                  {loginError}
                </motion.div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading || !username || !password}
                className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-blue-200">
                🔒 This is a secure system. All access is logged and monitored.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-200 text-sm">
            © 2025 Brain Health USA Center. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
