import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import JobDetailsModal from "./JobDetailsModal";
import ViewBidsModal from "./ViewBidsModal";

const JobsList = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isViewBidsOpen, setIsViewBidsOpen] = useState(false);

  // Mock data - replace with actual data from your API
  const jobs = [
    {
      id: 1,
      title: "UI/UX Designer",
      description:
        "Need a professional website collaboration and unlimited success.",
      skills: ["UI/UX Design", "React", "CSS", "HTML"],
      bidAmount: "$5000/hour",
      status: "active",
      bids: 12,
      postedOn: "20/12/2023",
    },
    {
      id: 2,
      title: "Front End Developer",
      description:
        "Looking for an experienced front-end developer for our web application.",
      skills: ["JavaScript", "React", "Tailwind CSS"],
      bidAmount: "$4500/hour",
      status: "active",
      bids: 8,
      postedOn: "19/12/2023",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      description: "Need a full stack developer for an e-commerce project.",
      skills: ["Node.js", "React", "MongoDB", "Express"],
      bidAmount: "$6000/hour",
      status: "active",
      bids: 15,
      postedOn: "18/12/2023",
    },
    // Add more mock jobs as needed
  ];

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleViewBids = (job) => {
    setSelectedJob(job);
    setIsViewBidsOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Good Afternoon, Username
        </h2>
        <p className="text-gray-600 mt-2">Your Job</p>
        <p className="text-gray-500 text-sm">
          Connect with global professional website collaboration and unlimited
          success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">Posted on {job.postedOn}</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm line-clamp-2">
                {job.description}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[#86D420] font-semibold">{job.bidAmount}</p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleViewJob(job)}
                className="px-4 py-2 text-[#86D420] hover:text-white border border-[#86D420] hover:bg-[#86D420] rounded-full text-sm transition-colors"
              >
                View Job
              </button>
              <button
                onClick={() => handleViewBids(job)}
                className="px-4 py-2 text-[#86D420] hover:text-white border border-[#86D420] hover:bg-[#86D420] rounded-full text-sm transition-colors"
              >
                View Bid
              </button>
            </div>
          </div>
        ))}
      </div>

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
