import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientDashboardLayout from "../../components/dashboard/ClientDashboardLayout";
import Profile from "../../pages/Profile";
import JobsList from "../../components/dashboard/client/JobsList";

const ClientDashboard = () => {
  return (
    <ClientDashboardLayout>
      <Routes>
        <Route index element={<JobsList />} />
        <Route path="jobs" element={<JobsList />} />
        <Route path="profile" element={<Profile isClient={true} />} />
      </Routes>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
