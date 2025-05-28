import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../store/slices/authSlice";
import loginImage from "../assets/images/login.png";
import PasswordInput from "../components/common/PasswordInput";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === "client") {
        navigate("/client/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values)).unwrap();
      } catch (err) {
        // Error is handled by Redux and toast
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2">
        <img
          src={loginImage}
          alt="Person typing on laptop"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-12">
            <h1 className="text-[#86D420] text-4xl font-bold mb-4">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6l-10 7L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-600">Email</span>
              </div>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Enter your email"
                  className="w-full pb-2 border-b border-gray-300 focus:border-[#86D420] focus:outline-none text-gray-600"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="absolute left-0 mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Password Input */}
            <PasswordInput
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              error={formik.touched.password && formik.errors.password}
              label="Password"
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-[#86D420] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#86D420] text-white text-lg font-semibold py-4 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#86D420] hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
