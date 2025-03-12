"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { userDataAtom } from "../atoms";
import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Friend{
  username: string,
  picture: string,
  id: number,
  name: string,
  onlineStatus:boolean,
  lastActive ?: string,
  unreadMessages ?: string
}

export default function FriendCard({ friend }: { friend: Friend }) {
  const router = useRouter(); 
  const [userDataValue] = useRecoilState(userDataAtom);
  const [hidden, setHidden] = useState(true);
  const cardRef = useRef<HTMLButtonElement>(null); // Ref to track the component
  const userName = useRecoilState(userDataAtom);

  function handleRightClick(event: React.MouseEvent) {
    event.preventDefault();
    setHidden(false);
    console.log("Right Clicked");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setHidden(true); // Hide the "Remove Friend" button
      }
    }

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function openChat() {
    const room = [userDataValue.username, friend.username].sort().join("-");
    router.push(`/chat/?room=${room}&name=${userDataValue.username}`);
  }
  const removeFriend = async () => {
    try {
      const removeUserFriend = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/friend/remove`,
        {
          myUserName: userName,
          friendUserName: friend.username,
        }
      );
      console.log("sent request for remove friend ");
      return removeUserFriend;
    } catch (error) {
      console.log("Can remove friend", error);
    }
  };

  return (
    <button
      ref={cardRef}
      onContextMenu={handleRightClick}
      onClick={openChat}
      className="hover:bg-gray-100 w-full cursor-pointer overflow-hidden relative"
    >
      {!hidden && (
        <button
          onClick={removeFriend}
          className="absolute right-0 top-0  bg-red-500 text-white p-1 rounded-bl-lg rounded-tr-lg hover:text-red-600 hover:font-medium hover:border-2 hover:border-red-500  hover:bg-white"
        >
          Remove Friend
        </button>
      )}
      <div className="flex items-center p-2">
        {/* Profile Picture */}
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full overflow-hidden">
          <Image
            src={friend.picture || "/avatar.png"} // Use friend's picture or fallback avatar
            width={50}
            height={50}
            alt={`${friend.username}'s profile`}
            style={{
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Friend Details */}
        <div className="flex flex-col justify-between w-full ml-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium truncate">
              {friend.username || "Unknown"}
            </div>
            <div className="text-xs text-gray-600">
              {friend.lastActive || "N/A"}
            </div>
          </div>
          <div className="flex items-center">
            {/* Online Status */}
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  friend.onlineStatus ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <div className="text-xs ml-1">
                {friend.onlineStatus ? "Online" : "Offline"}
              </div>
            </div>

            {/* Unread Messages */}
            {/* {friend.unreadMessages > 0 && (
              <div className="ml-auto w-5 h-5 flex justify-center items-center bg-orange-500 text-white text-xs rounded-full">
                {friend.unreadMessages}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </button>
  );
}
