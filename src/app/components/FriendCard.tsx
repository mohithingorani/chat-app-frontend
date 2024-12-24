import Image from "next/image";

export default function FriendCard({ friend }:{friend:any}) {
  return (
    <div className="hover:bg-gray-100 cursor-pointer border border-b-gray-200">
      <div className="flex p-2">
        {/* Profile Picture */}
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full overflow-hidden">
          <Image
            src={friend.picture || "/avatar.png"} // Use friend's picture or fallback avatar
            width={50}
            height={50}
            alt={`${friend.name}'s profile`}
            style={{
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Friend Details */}
        <div className="flex flex-col justify-between w-full ml-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">{friend.name || "Unknown"}</div>
            <div className="text-xs text-gray-600">{friend.lastActive || "N/A"}</div>
          </div>
          <div className="flex items-center">
            {/* Online Status */}
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  friend.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
              <div className="text-xs ml-1">
                {friend.isOnline ? "Online" : "Offline"}
              </div>
            </div>

            {/* Unread Messages */}
            {friend.unreadMessages > 0 && (
              <div className="ml-auto w-5 h-5 flex justify-center items-center bg-orange-500 text-white text-xs rounded-full">
                {friend.unreadMessages}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
