import { Link } from "react-router-dom";

const Breadcrumb = ({ heading, pageName }) => {
  return (
    <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-[28px]  font-bold text-darkBlue capitalize ">
        {heading ? heading : pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              className={`font-medium text-darkBlue`}
              to="/dashboard"
            >
              Dashboard
            </Link>
            {pageName && <span className="font-medium text-primary"> /</span>}
            
          </li>
          {pageName && (
            <li className="font-medium text-primary">{pageName}</li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
