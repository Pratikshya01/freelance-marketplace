import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError } from "../store/slices/authSlice";
import PasswordInput from "../components/common/PasswordInput";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link. Please request a new one.");
      navigate('/forgot-password');
      return;
    }
    dispatch(clearError());
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
console.log(token)
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        toast.error("Invalid reset link. Please request a new one.");
        navigate('/forgot-password');
        return;
      }

      try {
        const resetData = {
          token,
          data: {
            password: values.password,
            confirmPassword: values.confirmPassword
          }
        };
        
        await dispatch(resetPassword(resetData)).unwrap();
        toast.success("Password reset successful! Please login with your new password.");
        navigate("/login");
      } catch (err) {
        // Error is handled by Redux and toast
      }
    },
  });

  if (!token) {
    return null; // Prevent rendering the form if there's no token
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[500px]">
        <div className="text-center mb-12">
          <h1 className="text-[#86D420] text-4xl font-bold mb-4">
            Reset Your Password
          </h1>
          <p className="text-gray-600">
            Please enter your new password below
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <PasswordInput
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter new password"
            error={formik.touched.password && formik.errors.password}
            label="New Password"
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm new password"
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            label="Confirm New Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#86D420] text-white text-lg font-semibold py-4 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword;
