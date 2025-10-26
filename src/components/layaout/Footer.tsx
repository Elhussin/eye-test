"use client"
import { navUrl, socialLinks, otherLinks } from "../../constants/url"

export default function Footer() {

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm ">


        {/* Column 2: Page Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b pb-2 w-1/2 ">{"quickLinks"}</h4>
          <ul className="space-y-2">
            {navUrl.map((item : any, index : number) => (
              <li key={index}>
                <a href={item.path} className="hover:text-primary transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Other Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b pb-2 w-1/2">{"more"}</h4>
          <ul className="space-y-2">
            {otherLinks.map((item : any, index : number) => (
              <li key={index}>
                <a href={item.path} className="hover:text-primary transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 1: Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b pb-2 w-1/2">{"followUs"}</h4>
          <div className="grid grid-cols-3 gap-3  justify-around max-w-1/2">
            {socialLinks.map((item : any, index : any) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="flex justify-center text-gray-600 dark:text-gray-300 hover:text-primary transition"
                >
                  <Icon size={22} />
                </a>
              );
            })}
        </div>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {"footer"}. All rights reserved.
      </div>
    </footer>
  );
}
