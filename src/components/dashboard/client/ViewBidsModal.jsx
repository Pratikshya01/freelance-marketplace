import React, { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/outline";
import { jobsAPI } from "../../../services/api";
import toast from "react-hot-toast";

const ViewBidsModal = ({ isOpen, onClose, job }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [acceptingBidId, setAcceptingBidId] = useState(null);
  const [rejectingBidId, setRejectingBidId] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isProposalPopupOpen, setIsProposalPopupOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBids = async () => {
      if (!isOpen || !job?._id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await jobsAPI.getBids(job._id);
        setBids(response.data);
        setCurrentPage(0); // Reset to first page when new data is loaded
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bids");
        toast.error(err.response?.data?.message || "Failed to fetch bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [isOpen, job?._id]);

  const handleAcceptBid = async (bidId) => {
    try {
      setAcceptingBidId(bidId);

      // Accept the selected bid
      await jobsAPI.acceptBid(bidId);

      // Get all other bids for this job that are not the accepted one
      const otherBids = bids.filter(
        (bid) => bid._id !== bidId && bid.status === "pending"
      );

      // Reject all other pending bids
      await Promise.all(otherBids.map((bid) => jobsAPI.rejectBid(bid._id)));

      // Fetch fresh data after accepting bid and rejecting others
      const updatedBidsResponse = await jobsAPI.getBids(job._id);
      setBids(updatedBidsResponse.data);

      toast.success(
        "Bid accepted successfully and other bids were automatically rejected"
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to process bids");
    } finally {
      setAcceptingBidId(null);
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      setRejectingBidId(bidId);
      await jobsAPI.rejectBid(bidId);

      // Fetch fresh data after rejecting bid to ensure consistency
      const updatedBidsResponse = await jobsAPI.getBids(job._id);
      setBids(updatedBidsResponse.data);

      toast.success("Bid rejected successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject bid");
    } finally {
      setRejectingBidId(null);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    try {
      return amount ? `₹${amount.toLocaleString()}` : "N/A";
    } catch (error) {
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Calculate pagination
  const pageCount = Math.ceil(bids.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentBids = bids.slice(offset, offset + itemsPerPage);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto shadow-xl p-4">
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
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto shadow-xl p-4">
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">View Bids</h3>
              <p className="mt-1 text-sm text-gray-500">
                {job.title} - {bids.length} bids received
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Proposal Popup */}
          {isProposalPopupOpen && selectedProposal && (
            <div className="fixed inset-0 z-[60] overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Full Proposal
                    </h3>
                    <button
                      onClick={() => setIsProposalPopupOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedProposal}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table Content */}
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Freelancer
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                      Proposal
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                      Delivery
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-3 py-4 whitespace-normal">
                        <div className="text-sm font-medium text-gray-900">
                          {bid.freelancerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(bid.createdAt)}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedProposal(bid.proposal);
                              setIsProposalPopupOpen(true);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                            title="View full proposal"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <div
                            className="text-sm text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]"
                            title={bid.proposal}
                          >
                            {bid.proposal}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {formatCurrency(bid.amount)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(bid.deliveryTime)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            bid.status
                          )}`}
                        >
                          {bid.status || "pending"}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {bid.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAcceptBid(bid._id)}
                              disabled={
                                acceptingBidId !== null ||
                                rejectingBidId !== null
                              }
                              className={`${
                                acceptingBidId === bid._id
                                  ? "text-green-400 bg-green-50"
                                  : "text-green-600 hover:text-green-800 hover:bg-green-50"
                              } p-1 rounded-full transition-colors ${
                                (acceptingBidId !== null ||
                                  rejectingBidId !== null) &&
                                acceptingBidId !== bid._id
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              title={
                                acceptingBidId === bid._id
                                  ? "Accepting bid..."
                                  : "Accept Bid"
                              }
                            >
                              {acceptingBidId === bid._id ? (
                                <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full" />
                              ) : (
                                <CheckIcon className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleRejectBid(bid._id)}
                              disabled={
                                acceptingBidId !== null ||
                                rejectingBidId !== null
                              }
                              className={`${
                                rejectingBidId === bid._id
                                  ? "text-red-400 bg-red-50"
                                  : "text-red-600 hover:text-red-800 hover:bg-red-50"
                              } p-1 rounded-full transition-colors ${
                                (acceptingBidId !== null ||
                                  rejectingBidId !== null) &&
                                rejectingBidId !== bid._id
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              title={
                                rejectingBidId === bid._id
                                  ? "Rejecting bid..."
                                  : "Reject Bid"
                              }
                            >
                              {rejectingBidId === bid._id ? (
                                <div className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full" />
                              ) : (
                                <XMarkIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentPage === 0}
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(pageCount)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                        currentPage === idx
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))
                  }
                  disabled={currentPage === pageCount - 1}
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
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

export default ViewBidsModal;
