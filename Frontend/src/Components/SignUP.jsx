import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [Error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      email: "",
      password: "",
    });

    await axios
      .post("/api/signup", {
        email: email,
        password: password,
      })
      .then(function (response) {
        let d = response.data;
        if (d.user) {
          location.assign("/");
        }
      })
      .catch(function (error) {
        let err = error.response.data.errors;
        setError(err);
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div className="pt-11 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 text-[var(--demohead)]">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-lg">Join us today to get started</p>
        </div>

        {/* Auth Form */}
        <div className="bg-[var(--cardbg)] shadow-[0_4px_7px_1px_var(--cardshadow)] rounded-2xl p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-[var(--navtxt)]"
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[var(--navtxt)] rounded-xl transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
              <p className="block text-sm font-medium text-red-700 mb-2">
                {Error.email}
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-[var(--navtxt)] rounded-xl transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-[var(--demohead)] transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="block text-sm font-medium text-red-700 mb-2">
                {Error.password}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--dialoginp)] text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 pt-6 border-t border-[var(--dialoginp)]">
            <p className="text-center text-sm text-[var(--navtxt)] -mt-3">
              Already have an account?
              <button
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  setShowPassword(false);
                }}
                className="ml-1 font-medium text-[var(--carddscp)] hover:text-[var(--demohead)] transition-colors cursor-pointer"
              >
                <Link to={"/login"}>Log in</Link>
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
