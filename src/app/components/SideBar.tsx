// components/Sidebar.js
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex-col hidden xl:flex ">
      <div className="h-full  w-64 bg-white text-black flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 text-3xl font-bold border-b border-gray-700 top-10">
          Friends
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1">
          <ul className="p-4">
            <li className="mb-4">
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>                                                                                                                                                                                                                                                                                                                                                                          
            <li className="mb-4">
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">© 2024 My App</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
