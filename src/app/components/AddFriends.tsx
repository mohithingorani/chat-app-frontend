import Image from "next/image";
import FriendSearchCard from "./FriendSearchCard";

export default function AddFriendCard({
  users,
  searchFriend,
  userName,
  onChange,
  visible,
}: {
  users: any;
  searchFriend: string;
  userName: string;
  onChange: (e: any) => void;
  visible: boolean;
}) {
  return (
    visible && (
      <div className="absolute  mt-6 bg-white border p-4 rounded-xl shadow-md w-64">
        <div className="font-medium underline">Search Friend</div>
        <div className="flex my-4 ring-1 ring-gray-200 rounded-full p-2 ">
          <Image
            src="magnifying-glass.svg"
            width={24}
            height={24}
            alt="search"
          />
          <input
            onChange={onChange}
            type="text"
            className=" pl-2 w-36 py-1 outline-none"
            placeholder="user id"
          />
        </div>
        <div className="flex flex-col">
          {searchFriend.length > 0
            ? users.map((user: any) => {
                return (
                  <FriendSearchCard
                    key={user.id}
                    name={user.username}
                    image={user.picture}
                    myUserName={userName || ""}
                  />
                );
              })
            : null}
        </div>
      </div>
    )
  );
}
