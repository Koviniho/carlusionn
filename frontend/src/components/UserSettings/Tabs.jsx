import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PATHS from '../../routes/path';

export default function UserTabs() {
  const tabs = [
    { label: 'My Profile', path: PATHS.myProfile },
    { label: 'All Users', path: PATHS.myUsers },
    { label: 'Work Schedule', path: PATHS.workPlan },
    { label: 'Vacation Plan', path: PATHS.holidayPlan }
  ];
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  useEffect(() => {
    setSelectedTab(location.pathname); // Update selectedTab when location changes
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab.path);
    navigate(tab.path); // Navigate to the corresponding path
  };

  return (
    <div className="flex space-x-4 py-5">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => handleTabChange(tab)}
          className={`${
            selectedTab.includes(tab.path)  
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1.5 transition-colors duration-300 ease-in-out text-lg font-medium`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
