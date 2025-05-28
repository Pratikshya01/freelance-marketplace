import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updatePassword } from "../store/slices/authSlice";
import PropTypes from "prop-types";
import PasswordInput from "../components/common/PasswordInput";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  country: Yup.string().required("Country is required"),
});

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password'),
});

const Profile = ({ isClient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      country: user?.country || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("country", values.country);
        
        await dispatch(updateProfile(formData)).unwrap();
        setIsEditing(false);
      } catch (error) {
        // Error is handled by Redux and toast
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(updatePassword(values)).unwrap();
        setIsChangingPassword(false);
        passwordFormik.resetForm();
      } catch (error) {
        // Error is handled by Redux and toast
      }
    },
  });

  const renderField = (icon, label, value) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
      <div className="text-gray-400 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </div>
  );

  const renderEditableField = (id, label, type = "text", icon) => (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-gray-600 mb-2"
      >
        {icon}
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...formik.getFieldProps(id)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#86D420]"
      />
      {formik.touched[id] && formik.errors[id] && (
        <div className="mt-1 text-sm text-red-500">{formik.errors[id]}</div>
      )}
    </div>
  );

  const emailIcon = (
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );

  const userIcon = (
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  const locationIcon = (
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );

  const keyIcon = (
    <svg
      className="w-5 h-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex justify-end mb-6 gap-4">
            {!isEditing && !isChangingPassword && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-[#86D420] hover:text-[#78bf1d] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center gap-2 text-[#86D420] hover:text-[#78bf1d] transition-colors"
                >
                  {keyIcon}
                  Change Password
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-[#86D420] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user?.name?.charAt(0) || "U"}
            </div>
            <h1 className="text-[#86D420] text-2xl font-bold">
              {user?.name || "User"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {user?.email || "No email"}
            </p>
          </div>

          {isChangingPassword ? (
            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
              <PasswordInput
                id="currentPassword"
                name="currentPassword"
                value={passwordFormik.values.currentPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                placeholder="Enter current password"
                error={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
                label="Current Password"
              />

              <PasswordInput
                id="newPassword"
                name="newPassword"
                value={passwordFormik.values.newPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                placeholder="Enter new password"
                error={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
                label="New Password"
              />

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#86D420] text-white text-lg font-semibold py-3 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Updating Password..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    passwordFormik.resetForm();
                    setIsChangingPassword(false);
                  }}
                  className="flex-1 border-2 border-[#86D420] text-[#86D420] text-lg font-semibold py-3 rounded-full hover:bg-[#86D420] hover:text-white transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : isEditing ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {renderEditableField(
                "name",
                "Full Name",
                "text",
                userIcon
              )}

              {/* Email field is always read-only */}
              {renderField(emailIcon, "Email", formik.values.email)}

              {renderEditableField(
                "country",
                "Country",
                "text",
                locationIcon
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#86D420] text-white text-lg font-semibold py-3 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setIsEditing(false);
                  }}
                  className="flex-1 border-2 border-[#86D420] text-[#86D420] text-lg font-semibold py-3 rounded-full hover:bg-[#86D420] hover:text-white transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {renderField(
                userIcon,
                "Full Name",
                user?.name || "Not set"
              )}

              {renderField(emailIcon, "Email", user?.email || "Not set")}

              {renderField(
                locationIcon,
                "Country",
                user?.country || "Not set"
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  isClient: PropTypes.bool,
};

export default Profile;
