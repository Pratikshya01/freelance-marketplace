import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jobsAPI } from "../../services/api";
import toast from "react-hot-toast";

const dummyJobs = [
  {
    _id: "68335a02ff4d6357d3ffa55f",
    title: "Senior Frontend Developer",
    description:
      "We are seeking a highly skilled Senior Front-End Developer with strong proficiency in modern web technologies. The ideal candidate will have extensive experience in HTML, CSS, JavaScript, jQuery, Node.js, and AngularJS. You will play a key role in designing and implementing user-facing features, optimizing performance, and collaborating with cross-functional teams to deliver high-quality web applications.",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "Redux"],
    budget: 12000,
    deadline: "2025-07-15T00:00:00.000Z",
    status: "open",
    isDeleted: false,
    createdAt: "2025-05-25T17:57:22.007Z",
    clientName: "Arnab Barman",
  },
  {
    _id: "68335a02ff4d6357d3ffa560",
    title: "Full Stack Python Developer",
    description:
      "Looking for an experienced Full Stack Python Developer to join our dynamic team. The role involves building scalable web applications using Python/Django on the backend and React on the frontend. Must have strong experience with database design, API development, and modern frontend frameworks.",
    skills: ["Python", "Django", "PostgreSQL", "React", "AWS"],
    budget: 15000,
    deadline: "2025-08-20T00:00:00.000Z",
    status: "in progress",
    isDeleted: false,
    createdAt: "2025-05-26T10:30:00.000Z",
    clientName: "Sarah Johnson",
  },
  {
    _id: "68335a02ff4d6357d3ffa561",
    title: "UI/UX Designer",
    description:
      "We're looking for a creative UI/UX Designer to help create beautiful, intuitive interfaces for our web and mobile applications. The ideal candidate should have a strong portfolio demonstrating experience in user research, wireframing, prototyping, and modern design tools.",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
    budget: 8000,
    deadline: "2025-06-30T00:00:00.000Z",
    status: "open",
    isDeleted: false,
    createdAt: "2025-05-27T09:15:00.000Z",
    clientName: "Michael Chen",
  },
  {
    _id: "68335a02ff4d6357d3ffa562",
    title: "DevOps Engineer",
    description:
      "Seeking a skilled DevOps Engineer to help streamline our development and deployment processes. The ideal candidate will have hands-on experience with containerization, CI/CD pipelines, cloud infrastructure, and automation tools. Knowledge of security best practices is essential.",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
    budget: 18000,
    deadline: "2025-09-10T00:00:00.000Z",
    status: "in progress",
    isDeleted: false,
    createdAt: "2025-05-28T14:45:00.000Z",
    clientName: "David Wilson",
  },
  {
    _id: "68335a02ff4d6357d3ffa563",
    title: "Mobile App Developer",
    description:
      "We are looking for a talented Mobile App Developer with experience in React Native to help build cross-platform mobile applications. The ideal candidate should have a track record of delivering high-quality mobile apps and understanding of mobile UI/UX principles.",
    skills: ["React Native", "JavaScript", "iOS", "Android", "Firebase"],
    budget: 13500,
    deadline: "2025-07-30T00:00:00.000Z",
    status: "open",
    isDeleted: false,
    createdAt: "2025-05-29T11:20:00.000Z",
    clientName: "Emily Zhang",
  },
];

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getAllJobs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

export const fetchClientJobs = createAsyncThunk(
  "jobs/fetchClientJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getClientJobs();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

export const fetchJobDetails = createAsyncThunk(
  "jobs/fetchJobDetails",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.getJobDetails(jobId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job details"
      );
    }
  }
);

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.createJob(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create job"
      );
    }
  }
);

export const postBid = createAsyncThunk(
  "jobs/postBid",
  async ({ jobId, bidData }, { rejectWithValue }) => {
    try {
      const response = await jobsAPI.postBid(jobId, bidData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit bid"
      );
    }
  }
);


const initialState = {
  jobs: [],
  clientJobs: [],
  currentJob: null,
  totalJobs: 0,
  loading: false,
  error: null,
  jobDetailsStatus: "idle",
  jobDetailsError: null,
  bidSubmitStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  bidSubmitError: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobsError: (state) => {
      state.error = null;
    },
    resetBidStatus: (state) => {
      state.bidSubmitStatus = "idle";
      state.bidSubmitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch jobs");
      })
      // Fetch client jobs
      .addCase(fetchClientJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.clientJobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(fetchClientJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch jobs");
      })
      // Fetch job details
      .addCase(fetchJobDetails.pending, (state) => {
        state.jobDetailsStatus = "loading";
        state.jobDetailsError = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.jobDetailsStatus = "succeeded";
        state.currentJob = action.payload.data;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.jobDetailsStatus = "failed";
        state.jobDetailsError = action.payload;
        toast.error(action.payload || "Failed to fetch job details");
      })
      // Create job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.clientJobs.unshift(action.payload.job);
        state.totalJobs += 1;
        toast.success("Job created successfully");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to create job");
      })
      // Post bid
      .addCase(postBid.pending, (state) => {
        state.bidSubmitStatus = "loading";
        state.bidSubmitError = null;
      })
      .addCase(postBid.fulfilled, (state) => {
        state.bidSubmitStatus = "succeeded";
        toast.success("Bid submitted successfully");
      })
      .addCase(postBid.rejected, (state, action) => {
        state.bidSubmitStatus = "failed";
        state.bidSubmitError = action.payload;
        toast.error(action.payload || "Failed to submit bid");
      });
  },
});

export const { clearJobsError, resetBidStatus } = jobsSlice.actions;
export default jobsSlice.reducer;
