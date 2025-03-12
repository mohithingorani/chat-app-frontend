// Sidebar.js
import FriendCard from "./FriendCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../atoms";

const Sidebar = ({ userId }: { userId: number | undefined }) => {
  const [friends, setFriends] = useState([]);
  const [userDataValue] = useRecoilState(userDataAtom);

  

  useEffect(() => {
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
    if(userDataValue?.id)
    getFriends(userDataValue.id);

  },[userDataValue.id]);

  if(userId==undefined){
    return <div>
      
    </div>
  }

  return (
    <div className="flex flex-col overflow-y-scroll w-full h-fit border shadow-md rounded-[25px] bg-white">
      {/* Sidebar Header */}
      <div className="p-4 text-2xl top-10">Friends</div>

      {/* Sidebar Links */}
      <ul className="relative max-h-64 overflow-y-scroll">
        {friends.map((friend, key) => (
          <li key={key} className="">
            <FriendCard friend={friend} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
