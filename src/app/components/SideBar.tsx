// components/Sidebar.js
import Link from "next/link";
import FriendCard from "./FriendCard";

const Sidebar = () => {
  return (
    <div className="flex-col hidden xl:flex ">
      <div className="h-full  w-64 bg-white text-black flex flex-col rounded-xl ">
        {/* Sidebar Header */}
        <div className="p-4 text-2xl  border-b border-gray-700 top-10">
          Friends
        </div>

        {/* Sidebar Links */}
        <ul className=" max-h-64 overflow-y-scroll">
          <li className="">
            <FriendCard />
          </li>
          <li className="">
            <FriendCard />
          </li>
          <li className="">
            <FriendCard />
          </li>
          
        </ul>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">© 2024 My App</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
