import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "../components/jobs/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/slices/jobsSlice";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9; // Show 9 jobs per page (3x3 grid)

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter jobs based on search query
  const filteredJobs =
    jobs?.filter((job) => {
      if (!searchQuery) return true; // Show all jobs when no search query

      const searchLower = searchQuery.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(searchLower);
      const skillsMatch = job.skills.some((skill) =>
        skill.toLowerCase().includes(searchLower)
      );
      return titleMatch || skillsMatch;
    }) || [];

  // Calculate the jobs to display on current page
  const offset = currentPage * itemsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#86D420]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchJobs())}
            className="text-[#86D420] hover:text-[#78bf1d] font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-96 w-96 opacity-20">
          <div className="absolute h-full w-full bg-[#86D420] rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute -left-48 bottom-0 h-96 w-96 opacity-20">
          <div className="absolute h-full w-full bg-[#86D420] rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Connect with skilled professionals, estimate collaboration and
            unlock success. Join now and redefine your work experience!
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="flex-1 relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title or skills..."
              className="w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Active Search Term Indicator */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing results for:{" "}
              <span className="font-medium">{searchQuery}</span>
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentJobs.map((job) => (
            <JobCard
              key={job?._id}
              id={job?._id}
              title={job?.title}
              postedDate={new Date(job?.createdAt).toLocaleDateString()}
              description={job?.description}
              skills={job?.skills}
              budget={job?.budget}
              status={job?.status}
            >
              <button
                onClick={() => navigate(`/jobs/${job?._id}`)}
                className="flex-1 px-4 py-2.5 bg-[#7AC64D] text-white font-medium rounded-full hover:bg-[#68b340] transition-colors text-sm"
              >
                View Details
              </button>
            </JobCard>
          ))}
        </div>

        {/* No Results Message */}
        {currentJobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No jobs found matching your search criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-8">
            <ReactPaginate
              previousLabel={
                <span className="flex items-center gap-1">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </span>
              }
              nextLabel={
                <span className="flex items-center gap-1">
                  Next
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              }
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName="flex items-center gap-2"
              pageClassName="px-3 py-1 rounded-full hover:bg-[#86D420] hover:text-white transition-colors"
              pageLinkClassName="text-sm font-medium"
              previousClassName="px-4 py-1 rounded-full text-sm font-medium hover:bg-[#86D420] hover:text-white transition-colors"
              nextClassName="px-4 py-1 rounded-full text-sm font-medium hover:bg-[#86D420] hover:text-white transition-colors"
              breakClassName="text-gray-400"
              activeClassName="!bg-[#86D420] text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
