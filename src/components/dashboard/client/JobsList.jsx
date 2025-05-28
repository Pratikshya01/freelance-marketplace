import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientJobs } from "../../../store/slices/jobsSlice";
import JobDetailsModal from "./JobDetailsModal";
import ViewBidsModal from "./ViewBidsModal";
import JobCard from "../../jobs/JobCard";

const JobsList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { clientJobs, totalJobs, loading, error } = useSelector(
    (state) => state.jobs
  );
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isViewBidsOpen, setIsViewBidsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchClientJobs());
  }, [dispatch]);

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleViewBids = (job) => {
    setSelectedJob(job);
    setIsViewBidsOpen(true);
  };

  const handleJobDeleted = () => {
    // Refresh the jobs list after deletion
    dispatch(fetchClientJobs());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchClientJobs())}
          className="text-primary hover:text-primary-dark font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, {user?.name || "User"}
        </h2>
        <div className="flex justify-between items-center mt-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Jobs</h1>
            <p className="text-gray-500 mt-2">
              You have posted {totalJobs || 0} job
              {(totalJobs || 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {!clientJobs?.length ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            No Jobs Posted Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start hiring talented freelancers by posting your first job.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientJobs.map((job) => (
            <JobCard
              key={job?._id}
              title={job?.title}
              description={job?.description}
              postedDate={job?.createdAt}
              id={job?._id}
              isClient={true}
              onDeleted={handleJobDeleted}
              job={job}
            >
              <button
                onClick={() => handleViewJobDetails(job)}
                className="flex-1 px-4 py-2.5 bg-[#7AC64D] text-white font-medium rounded-full hover:bg-[#68b340] transition-colors text-sm"
              >
                View Details
              </button>
              <button
                onClick={() => handleViewBids(job)}
                className="flex-1 px-4 py-2.5 text-[#7AC64D] border-2 border-[#7AC64D] font-medium rounded-full hover:bg-[#7AC64D] hover:text-white transition-colors text-sm"
              >
                View Bids
              </button>
            </JobCard>
          ))}
        </div>
      )}

      {/* Modals */}
      <JobDetailsModal
        isOpen={isJobDetailsOpen}
        onClose={() => setIsJobDetailsOpen(false)}
        job={selectedJob}
      />
      <ViewBidsModal
        isOpen={isViewBidsOpen}
        onClose={() => setIsViewBidsOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobsList;
