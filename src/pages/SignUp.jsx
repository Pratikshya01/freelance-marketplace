import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, clearRegistrationSuccess } from "../store/slices/authSlice";
import signupImage from "../assets/images/signup.png";
import PasswordInput from "../components/common/PasswordInput";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  country: Yup.string().required("Country is required"),
  role: Yup.string()
    .oneOf(["client", "freelancer"], "Please select a valid user type")
    .required("Please select your user type"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, registrationSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearRegistrationSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (registrationSuccess) {
      toast.success("Registration successful! Please check your email for OTP.");
    }
  }, [registrationSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      country: "",
      role: "client",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("country", values.country);
      formData.append("role", values.role);
      formData.append("photo", null); // Still sending photo as null

      try {
        await dispatch(registerUser(formData)).unwrap();
        navigate("/verify-email", { state: { email: values.email } });
      } catch (err) {
        // Error is handled by Redux and toast
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-1/2">
        <img
          src={signupImage}
          alt="Person typing on laptop"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-12">
            <h1 className="text-[#86D420] text-4xl font-bold mb-4">
              Create Your Account Now
            </h1>
            <p className="text-gray-600">
              Join our freelance marketplace and start your journey
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-600">Full Name</span>
              </div>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter your full name"
                  className="w-full pb-2 border-b border-gray-300 focus:border-[#86D420] focus:outline-none text-gray-600"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="absolute left-0 mt-1 text-sm text-red-500">
                    {formik.errors.name}
                  </div>
                )}
              </div>
            </div>

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

            {/* Country Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-600">Country</span>
              </div>
              <div className="relative">
                <input
                  id="country"
                  type="text"
                  {...formik.getFieldProps("country")}
                  placeholder="Enter your country"
                  className="w-full pb-2 border-b border-gray-300 focus:border-[#86D420] focus:outline-none text-gray-600"
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="absolute left-0 mt-1 text-sm text-red-500">
                    {formik.errors.country}
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

            {/* Role Selection */}
            <div>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={formik.values.role === "client"}
                      onChange={formik.handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[#86D420] checked:bg-white focus:outline-none focus:ring-0 transition-colors"
                    />
                    <div className="absolute pointer-events-none w-2.5 h-2.5 rounded-full bg-[#86D420] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-all duration-200" />
                  </div>
                  <span className="text-gray-600 text-base">Client</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="freelancer"
                      checked={formik.values.role === "freelancer"}
                      onChange={formik.handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[#86D420] checked:bg-white focus:outline-none focus:ring-0 transition-colors"
                    />
                    <div className="absolute pointer-events-none w-2.5 h-2.5 rounded-full bg-[#86D420] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-all duration-200" />
                  </div>
                  <span className="text-gray-600 text-base">Freelancer</span>
                </label>
              </div>
              {formik.touched.role && formik.errors.role && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.role}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#86D420] text-white text-lg font-semibold py-4 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-12"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#86D420] hover:underline">
                  Login
                </Link>
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              By signing up you agree to freelancer marketplace's{" "}
              <Link
                to="/privacy-policy"
                className="text-[#86D420] hover:underline"
              >
                privacy policy
              </Link>{" "}
              and{" "}
              <Link
                to="/terms-of-service"
                className="text-[#86D420] hover:underline"
              >
                Terms of service
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
