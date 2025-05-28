import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../store/slices/authSlice";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(forgotPassword(values)).unwrap();
        toast.success("Reset password link has been sent to your email!");
        navigate("/login");
      } catch (err) {
        // Error is handled by Redux and toast
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[500px]">
        <div className="text-center mb-12">
          <h1 className="text-[#86D420] text-4xl font-bold mb-4">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600">
            No worries! Just enter your email, and we will send you a reset link.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#86D420] text-white text-lg font-semibold py-4 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-[#86D420] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
