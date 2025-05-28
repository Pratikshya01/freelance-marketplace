import React, { useState } from "react";
import PropTypes from "prop-types";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import DeleteJobModal from "../common/DeleteJobModal";
import EditJobModal from "../common/EditJobModal";

const JobCard = ({ title, postedDate, description, id, isClient, onDeleted, children, job }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).split('/').join('/');
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">Posted on {formatDate(postedDate)}</p>
          </div>
          {isClient && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-[#7AC64D] hover:text-[#68b340] p-2 rounded-full hover:bg-green-50 transition-colors flex-shrink-0"
                title="Edit Job"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                title="Delete Job"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 flex-grow line-clamp-3 mb-6">{description}</p>
        
        {children && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {children}
          </div>
        )}
      </div>

      <DeleteJobModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        jobId={id}
        onDeleted={onDeleted}
      />

      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        job={job}
        onUpdated={onDeleted}
      />
    </>
  );
};

JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  postedDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isClient: PropTypes.bool,
  onDeleted: PropTypes.func,
  children: PropTypes.node,
  job: PropTypes.object,
};

JobCard.defaultProps = {
  isClient: false,
  onDeleted: () => {},
};

export default JobCard;
