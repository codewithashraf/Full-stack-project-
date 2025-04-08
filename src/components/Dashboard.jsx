import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FiMenu,
  FiChevronLeft,
  FiUsers,
  FiBell,
  FiBookOpen,
  FiFileText,
  FiClipboard,
} from "react-icons/fi";
import { RiFileListLine } from "react-icons/ri";

export default function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  return (
    <div className="flex h-fit min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-[300] bg-gradient-to-br from-gray-900 to-indigo-800 border-r border-white/20 sm:p-4 p-3 z-50 w-[40%]  ${
          isSidebarCollapsed ? "w-[60px]" : "md:w-[20%]"
        } ${
          isMobileSidebarOpen ? "translate-x-[0%]" : "-translate-x-[300%]"
        } md:translate-x-0 `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between text-white mb-8">
          <Link
            to={"/dashboard"}
            className={`sm:text-2xl cursor-pointer text:sm font-bold ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Dashboard
          </Link>
          <button
            className="md:hidden text-sm sm:text-xl"
            onClick={toggleMobileSidebar}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6">
          <li>
            <Link
              to="/dashboard/StudentList"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiUsers />
              {!isSidebarCollapsed && <span>Students List</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/Notification"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiBell />
              {!isSidebarCollapsed && <span>Notification</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/AddMaterial"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiBookOpen />
              {!isSidebarCollapsed && <span>Add Material</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/AllMateirals"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiFileText />
              {!isSidebarCollapsed && <span>All Materials</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/CreateTests"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiClipboard />
              {!isSidebarCollapsed && <span>Create Tests</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/CreatedTests"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <FiClipboard />
              {!isSidebarCollapsed && <span>Created Tests</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/TestSubmissions"
              className="flex items-center md:text-lg text-sm space-x-2 text-white hover:text-blue-400 cursor-pointer"
            >
              <RiFileListLine />
              {!isSidebarCollapsed && <span>Tests Submissions</span>}
            </Link>
          </li>
        </ul>

        {/* Collapse/Expand Button */}
        <button
          className="absolute bottom-4 right-4 md:block hidden text-white text-xl"
          onClick={toggleSidebar}
        >
          {isSidebarCollapsed ? <FiChevronLeft /> : <FiMenu />}
        </button>
      </div>

      {/* Overlay for Mobile View */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-0 bg-gradient-to-br from-gray-900 to-blue-800 transition-margin duration-300 max-md:ml-0 ${
          isSidebarCollapsed ? "ml-[60px]" : "ml-[20%]"
        }`}
      >
        <button
          className={`absolute top-4 left-4 text-white text-xl ${
            isMobileSidebarOpen ? "hidden" : "block"
          } md:hidden z-50`}
          onClick={() => toggleMobileSidebar()}
        >
          <FiMenu />
        </button>

        {/* children hain saray */}
        <Outlet />
        {/* Right Main Area */}
        {/* <WelcomeDashboard /> */}
      </div>
    </div>
  );
}
