import PropTypes from "prop-types";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const BidsTable = ({ bids }) => {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isProposalPopupOpen, setIsProposalPopupOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <>
      {/* Proposal Popup */}
      {isProposalPopupOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
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

      <div className="w-full overflow-hidden rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                  Sl No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">
                  Proposal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                  Bid Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.map((bid, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[80px]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 w-[200px]">
                    <div
                      className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={bid.jobTitle}
                    >
                      {bid.jobTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                        className="max-w-[300px] text-sm text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
                        title={bid.proposal}
                      >
                        {bid.proposal}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-[120px]">
                    <div className="text-sm font-medium text-[#86D420]">
                      ₹{bid.bidAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[150px]">
                    {bid.deliveryTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-[100px]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        bid.status
                      )}`}
                    >
                      {bid.status || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
              {bids.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No bids found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

BidsTable.propTypes = {
  bids: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      proposal: PropTypes.string.isRequired,
      bidAmount: PropTypes.number.isRequired,
      deliveryTime: PropTypes.string.isRequired,
      status: PropTypes.string,
    })
  ).isRequired,
};

export default BidsTable;
