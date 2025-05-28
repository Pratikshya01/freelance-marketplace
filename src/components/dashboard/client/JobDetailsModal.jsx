import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const JobDetailsModal = ({ isOpen, onClose, job }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!isOpen || !job?._id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://freelancer-npou.onrender.com/api/jobs/${job._id}`);
        setJobDetails(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [isOpen, job?._id]);

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatCurrency = (amount) => {
    try {
      return amount ? `₹${amount.toLocaleString()}` : 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  const statusColors = {
    'in progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    open: 'bg-blue-100 text-blue-800',
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="relative bg-white rounded-lg max-w-xl w-full mx-auto shadow-xl p-4">
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="relative bg-white rounded-lg max-w-xl w-full mx-auto shadow-xl p-4">
            <div className="text-center py-6">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayJob = jobDetails || job;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-xl w-full mx-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
              <p className="mt-1 text-sm text-gray-500">Posted on {formatDate(displayJob.createdAt)}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="text-xl font-semibold text-gray-900">
                  {displayJob.title}
                </h4>
                <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${statusColors[displayJob.status]}`}>
                  {displayJob.status}
                </span>
              </div>

              <div>
                <h5 className="text-base font-medium text-gray-900 mb-1">Description</h5>
                <p className="text-sm text-gray-600">{displayJob.description}</p>
              </div>

              <div>
                <h5 className="text-base font-medium text-gray-900 mb-1">Required Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {displayJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-0.5 bg-primary-10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-base font-medium text-gray-900 mb-1">Budget</h5>
                  <p className="text-lg font-semibold text-primary">{formatCurrency(displayJob.budget)}</p>
                </div>
                <div>
                  <h5 className="text-base font-medium text-gray-900 mb-1">Deadline</h5>
                  <p className="text-sm text-gray-800">{formatDate(displayJob.deadline)}</p>
                </div>
              </div>

              {displayJob.clientName && (
              <div>
                  <h5 className="text-base font-medium text-gray-900 mb-1">Posted By</h5>
                  <p className="text-sm text-gray-800">{displayJob.clientName}</p>
              </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
