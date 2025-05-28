import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BriefcaseIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../layout/Navbar";

const ClientDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Your Jobs",
      icon: BriefcaseIcon,
      path: "/client/dashboard/jobs",
    },
    { name: "Profile", icon: UserIcon, path: "/client/dashboard/profile" },
  ];

  const isActivePath = (path) => {
    if (path === "/client/dashboard/jobs") {
      return (
        location.pathname === "/client/dashboard" || location.pathname === path
      );
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isDashboard={true} />

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 z-30 w-64 h-[calc(100vh-5rem)] transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-[#86D420]">Dashboard</h1>
          </div>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all ${
                    isActivePath(item.path)
                      ? "bg-[#86D420] bg-opacity-10 text-[#86D420]"
                      : "text-gray-600"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:ml-64 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
