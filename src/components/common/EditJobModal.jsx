import React from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jobsAPI } from "../../services/api";
import toast from "react-hot-toast";
import ChipInput from "./ChipInput";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  budget: Yup.number()
    .required("Budget is required")
    .min(1, "Budget must be greater than 0"),
  deadline: Yup.date()
    .required("Deadline is required")
    .min(new Date(), "Deadline cannot be in the past"),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "At least one skill is required"),
});

const EditJobModal = ({ isOpen, onClose, job, onUpdated }) => {
  const formik = useFormik({
    initialValues: {
      title: job?.title || "",
      description: job?.description || "",
      budget: job?.budget || "",
      deadline: job?.deadline ? new Date(job.deadline).toISOString().split('T')[0] : "",
      skills: job?.skills || [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await jobsAPI.updateJob(job._id, values);
        toast.success("Job updated successfully");
        onUpdated();
        onClose();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update job");
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-2xl max-w-2xl w-full mx-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Edit Job</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...formik.getFieldProps("title")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7AC64D] focus:border-[#7AC64D]"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...formik.getFieldProps("description")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7AC64D] focus:border-[#7AC64D]"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Skills Required
                </label>
                <ChipInput
                  value={formik.values.skills}
                  onChange={(newSkills) => formik.setFieldValue("skills", newSkills)}
                  placeholder="Type a skill and press Enter"
                  error={formik.touched.skills && formik.errors.skills}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Budget (₹)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    {...formik.getFieldProps("budget")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7AC64D] focus:border-[#7AC64D]"
                  />
                  {formik.touched.budget && formik.errors.budget && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.budget}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    {...formik.getFieldProps("deadline")}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#7AC64D] focus:border-[#7AC64D]"
                  />
                  {formik.touched.deadline && formik.errors.deadline && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.deadline}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#7AC64D] rounded-lg hover:bg-[#68b340] transition-colors disabled:opacity-50"
              >
                {formik.isSubmitting ? "Updating..." : "Update Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditJobModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  job: PropTypes.object,
  onUpdated: PropTypes.func.isRequired,
};

export default EditJobModal; 