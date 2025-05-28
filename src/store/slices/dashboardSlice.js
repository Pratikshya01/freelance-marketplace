import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, jobsAPI } from '../../services/api';
import toast from 'react-hot-toast';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getDashboard();
      const dashboard = response.data.dashboard;

      // Fetch job details for each bid
      const jobDetailsPromises = dashboard.Bid.map(async (bid) => {
        try {
          const jobResponse = await jobsAPI.getJobDetails(bid.job);
          return {
            jobId: bid.job,
            title: jobResponse.data.data.title // Access title from data.data
          };
        } catch (error) {
          console.error(`Failed to fetch job details for job ${bid.job}:`, error);
          return {
            jobId: bid.job,
            title: 'Job Not Found'
          };
        }
      });

      const jobDetails = await Promise.all(jobDetailsPromises);
      
      // Create a map of job IDs to titles
      const jobTitles = Object.fromEntries(
        jobDetails.map(job => [job.jobId, job.title])
      );

      return {
        ...dashboard,
        jobTitles
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

const initialState = {
  user: null,
  bids: [],
  jobTitles: {},
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.bids = action.payload.Bid;
        state.jobTitles = action.payload.jobTitles;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to fetch dashboard data');
      });
  }
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer; 