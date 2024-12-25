// Sidebar.js
import Link from "next/link";
import FriendCard from "./FriendCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../atoms";

const Sidebar = ({ userId }: { userId: number }) => {
  const [friends, setFriends] = useState([]);
  const [userDataValue] = useRecoilState(userDataAtom);

  async function getFriends(userId: number) {
    try {
      console.log("Fetching friends for user id:", userId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/friends?userId=${userId}`
      );
      setFriends(response.data.friends || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }

  useEffect(() => {
    if (userDataValue.id) {
      getFriends(userDataValue.id);
    }
  }, [userDataValue.id]); // Add dependency to ensure it triggers when `userDataValue.id` changes

  return (
    <div className="flex flex-col w-full h-full border shadow-md rounded-[25px] bg-white">
      {/* Sidebar Header */}
      <div className="p-4 text-2xl top-10">Friends</div>

      {/* Sidebar Links */}
      <ul className="max-h-64 overflow-y-scroll">
        {friends.map((friend,key) => (
          <li key={key} className="">
            <FriendCard friend={friend}    /> {/* Pass friend as a prop */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
