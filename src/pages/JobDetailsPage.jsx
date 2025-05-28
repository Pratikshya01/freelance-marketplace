import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JobDetail from "../components/jobs/JobDetail";
import BidForm from "../components/jobs/BidForm";
import { fetchJobDetails, postBid, resetBidStatus } from "../store/slices/jobsSlice";

const JobDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    currentJob, 
    jobDetailsStatus, 
    jobDetailsError,
    bidSubmitStatus,
    bidSubmitError 
  } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetails(id));
    }
  }, [dispatch, id]);

  // Reset bid status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetBidStatus());
    };
  }, [dispatch]);

  const handleBidSubmit = async (values) => {
    const bidData = {
      proposal: values.proposal,
      amount: Number(values.bidAmount),
      deliveryTime: new Date(Date.now() + (values.deliveryTime * 24 * 60 * 60 * 1000)).toISOString()
    };

    try {
      await dispatch(postBid({ jobId: id, bidData })).unwrap();
      // Navigate to dashboard active bids after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit bid:', error);
    }
  };

  if (jobDetailsStatus === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (jobDetailsStatus === 'failed') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{jobDetailsError}</p>
          <button
            onClick={() => dispatch(fetchJobDetails(id))}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentJob) {
    return null;
  }

  // Transform API data to match JobDetail component props
  const jobData = {
    title: currentJob.title,
    description: currentJob.description,
    skills: currentJob.skills,
    budget: currentJob.budget,
    status: currentJob.status,
    postedDate: new Date(currentJob.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    deadline: new Date(currentJob.deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    clientName: currentJob.clientName,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{jobData.title}</h1>
          <p className="text-gray-600 mt-2">Posted by {jobData.clientName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Status Badge */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">Posted on {jobData.postedDate}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  jobData.status === 'open' ? 'bg-green-100 text-green-800' :
                  jobData.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {jobData.status}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{jobData.description}</p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {jobData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Budget and Deadline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">Budget</h2>
                  <p className="text-gray-600">₹{jobData.budget.toLocaleString()}</p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">Deadline</h2>
                  <p className="text-gray-600">{jobData.deadline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BidForm
                onSubmit={handleBidSubmit}
                minBudget={jobData.budget * 0.8}
                maxBudget={jobData.budget}
                isSubmitting={bidSubmitStatus === 'loading'}
                error={bidSubmitError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
