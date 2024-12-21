import { Link } from "react-router-dom";

const Sidebar = ({ title, links, isSidebarOpen, setIsSidebarOpen }) => (
    <aside
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 w-64 bg-gray-800 p-4 fixed top-0 left-0 h-full transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button className="text-white sm:hidden" onClick={() => setIsSidebarOpen(false)}>
          X
        </button>
      </div>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className="flex items-center text-white p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </button>
            ) : (
              <Link
                to={link.href}
                className="flex items-center text-white p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
  
  export default  Sidebar;