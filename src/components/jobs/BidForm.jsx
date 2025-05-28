import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  bidAmount: Yup.number()
    .required("Bid amount is required")
    .min(1, "Bid amount must be greater than 0"),
  deliveryTime: Yup.number()
    .required("Delivery time is required")
    .min(1, "Delivery time must be at least 1 day"),
  proposal: Yup.string()
    .required("Proposal is required")
    .max(1000, "Proposal must not exceed 1000 characters"),
});

const BidForm = ({ onSubmit, minBudget, maxBudget }) => {
  const formik = useFormik({
    initialValues: {
      bidAmount: "",
      deliveryTime: "",
      proposal: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Bid submission failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Submit a Proposal
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="bidAmount"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              Bid Amount ($)
            </label>
            <input
              id="bidAmount"
              type="number"
              {...formik.getFieldProps("bidAmount")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent"
              placeholder="Enter your bid amount"
            />
            {formik.touched.bidAmount && formik.errors.bidAmount && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.bidAmount}
              </div>
            )}
            {minBudget && maxBudget && (
              <p className="mt-1 text-sm text-gray-500">
                Budget Range: ${minBudget} - ${maxBudget}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="deliveryTime"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Delivery Time (Days)
            </label>
            <input
              id="deliveryTime"
              type="number"
              {...formik.getFieldProps("deliveryTime")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent"
              placeholder="Enter delivery time in days"
            />
            {formik.touched.deliveryTime && formik.errors.deliveryTime && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.deliveryTime}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="proposal"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            Proposal
          </label>
          <textarea
            id="proposal"
            {...formik.getFieldProps("proposal")}
            rows={6}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent resize-none"
            placeholder="Write a compelling proposal explaining why you're the best fit for this job..."
          />
          <div className="flex justify-between items-center mt-1">
            {formik.touched.proposal && formik.errors.proposal ? (
              <div className="text-sm text-red-500">
                {formik.errors.proposal}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {formik.values.proposal.length}/1000 characters
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-[#86D420] text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-[#78bf1d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Submitting Proposal..." : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
};

BidForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  minBudget: PropTypes.number,
  maxBudget: PropTypes.number,
};

export default BidForm;
