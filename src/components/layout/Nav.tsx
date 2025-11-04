import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();

  const links = [
    { path: "/", label: "Eye Test" },
    { path: "/thickness-calculator", label: "Lens Thickness" },

  ];

  return (
    <nav className="flex justify-start bg-gray-50 py-3 shadow-sm">
      <ul className="flex gap-6">
        {links.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`px-3 py-2 rounded-lg transition ${
                pathname === path
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
