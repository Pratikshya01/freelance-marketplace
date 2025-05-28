import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import BidsTable from "../../components/dashboard/BidsTable";
import { fetchDashboardData } from '../../store/slices/dashboardSlice';

const MyBids = () => {
  const dispatch = useDispatch();
  const { bids, jobTitles, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Format bids data for the BidsTable component
  const formattedBids = bids.map(bid => ({
    jobTitle: jobTitles[bid.job] || 'Loading...',
    proposal: bid.proposal,
    bidAmount: bid.amount,
    deliveryTime: new Date(bid.deliveryTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: bid.status || 'pending'
  }));

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchDashboardData())}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Bids</h1>

        {formattedBids.length > 0 ? (
          <BidsTable bids={formattedBids} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No bids found
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBids;
