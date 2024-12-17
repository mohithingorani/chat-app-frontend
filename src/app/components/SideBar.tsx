// components/Sidebar.js
import Link from "next/link";
import FriendCard from "./FriendCard";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-full  border shadow-md rounded-[25px] bg-white">
      {/* Sidebar Header */}
      <div className="p-4 text-2xl   top-10">
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


    </div>
  );
};

export default Sidebar;
