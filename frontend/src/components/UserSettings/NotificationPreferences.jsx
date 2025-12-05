/* eslint-disable react/prop-types */
import CustomInput from "../Input/custoInput";

const NotificationPreferences = ({ preferences, onPreferenceChange }) => {
  // Default preferences structure if none provided
  const defaultPreferences = [
    {
      id: "jobRecommendations",
      title: "Job Recommendations",
      description:
        "Based on the jobs you viewed, you'll receive automatically job recommendations by email.",
      enabled: false,
    },
    {
      id: "companyNews",
      title: "Company News",
      description:
        "If you follow companies, you will receive email updates about these.",
      enabled: false,
    },
    {
      id: "savedJobs",
      title: "Saved Jobs Reminder",
      description: "Weekly reminder for saved job ads.",
      enabled: false,
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description:
        "Weekly newsletter with tips for your job search, applications and news about our platform.",
      enabled: false,
    },
    {
      id: "jobrecommendations",
      title: "Job Recommendations",
      description:
        "Based on the jobs you viewed, you'll receive automatically job recommendations by email.",
      enabled: false,
    },
    {
      id: "companyNews",
      title: "Company News",
      description:
        "If you follow companies, you will receive email updates about these.",
      enabled: true,
    },
    {
      id: "savedjobsreminder",
      title: "Saved Jobs Reminder",
      description: "Weekly reminder for saved job ads.",
      enabled: false,
    },
  ];

  const items = preferences || defaultPreferences;

  return (
    <div className="space-y-6 border rounded-lg">
      {items.map((preference) => (
        <div
          key={preference.id}
          className="py-3 border-b border-gray-100 last:border-0 p-4"
        >
          <CustomInput
            type="toggle"
            name={preference.id}
            value={preference.enabled}
            onChange={(e) =>
              onPreferenceChange?.(preference.id, e.target.value)
            }
            label={
              <div className="flex flex-col">
                <span className="text-lg font-bold text-darkBlue">
                  {preference.title}
                </span>
                <span className="text-base text-grayText font-medium w-3/4">
                  {preference.description}
                </span>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationPreferences;
