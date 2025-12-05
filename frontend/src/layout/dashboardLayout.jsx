/* eslint-disable react/prop-types */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-[#FAFEFD] flex pl-8 py-8">
      {/* Sidebar with toggle handler */}
      <Sidebar onToggle={setIsSidebarCollapsed} />

      {/* Main content */}
      <main
        className={`${
          isSidebarCollapsed ? "px-[30px]" : "px-[30px]"
        } flex-1 px-6 pb-6 overflow-x-hidden`}
      >
        <DashboardHeader />

        {children || <Outlet />}
      </main>
    </div>
  );
}

export default DashboardLayout;
