import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientJobs } from '../../store/slices/jobsSlice';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const statusColors = {
    'in progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    open: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-primary-10 text-primary px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Budget</p>
          <p className="font-semibold text-gray-800">₹{job?.budget?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="font-semibold text-gray-800">
            {new Date(job.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      {job.acceptedBid && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Accepted Bid</h4>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{job.acceptedBid.freelancerName}</span>
              <span className="text-primary font-semibold">₹{job?.acceptedBid?.amount?.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">{job?.acceptedBid?.proposal}</p>
            <p className="text-sm text-gray-500 mt-2">
              Delivery by: {new Date(job?.acceptedBid?.deliveryTime)?.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {job.nonAcceptedBids && job.nonAcceptedBids.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-600">Other Bids</h4>
            <span className="text-sm text-gray-500">{job.nonAcceptedBids.length} bids</span>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Link
          to={`/client/jobs/${job._id}`}
          className="text-primary hover:text-primary-dark font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

const JobList = () => {
  const dispatch = useDispatch();
  const { clientJobs, totalJobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchClientJobs());
  }, [dispatch]);

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

  if (clientJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">No Jobs Posted Yet</h3>
        <p className="text-gray-600 mb-6">Start hiring talented freelancers by posting your first job.</p>
        <Link
          to="/client/post-job"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
        >
          Post a Job
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Jobs</h2>
          <p className="text-gray-600">You have posted {totalJobs} job{totalJobs !== 1 ? 's' : ''}</p>
        </div>
        <Link
          to="/client/post-job"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
        >
          Post a Job
        </Link>
      </div>

      <div className="space-y-6">
        {clientJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList; 