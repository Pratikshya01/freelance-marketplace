import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import JobsTable from "../../components/dashboard/JobsTable";

// Mock data - Replace with actual API calls
const allJobs = [
  {
    title: "Full Stack Developer",
    description: "There is no one who loves pain itself, who seeks after.",
    skills: ["Programming", "Frameworks", "Databases"],
    budget: 230,
    deadline: "04.01.2025 22:19",
    status: "Active",
  },
  {
    title: "Java Script Developers",
    description: "There is no one who loves pain itself, who seeks after.",
    skills: ["HTML", "CSS", "Vue.js"],
    budget: 240,
    deadline: "23.05.2025 18:00",
    status: "Completed",
  },
  {
    title: "Graphic Designer",
    description: "There is no one who loves pain itself, who seeks after.",
    skills: ["Photoshop", "Illustrator", "InDesign", "Color Theory"],
    budget: 220,
    deadline: "18.10.2025 17:08",
    status: "Completed",
  },
  {
    title: "Front End Development",
    description: "There is no one who loves pain itself, who seeks after.",
    skills: ["HTML", "CSS", "Angular", "Vue.js"],
    budget: 230,
    deadline: "25.12.2025 04:44",
    status: "Active",
  },
  {
    title: "Node.Js Development",
    description: "There is no one who loves pain itself, who seeks after.",
    skills: ["Node.js", "Frameworks", "APIs", "JavaScript"],
    budget: 240,
    deadline: "28.12.2025 21:35",
    status: "Completed",
  },
];

const ActiveJobs = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Jobs</h1>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#86D420] focus:border-transparent">
              <option value="">Sort By</option>
              <option value="deadline">Deadline</option>
              <option value="budget">Budget</option>
            </select>
          </div>
        </div>

        <JobsTable jobs={allJobs} />
      </div>
    </DashboardLayout>
  );
};

export default ActiveJobs;
