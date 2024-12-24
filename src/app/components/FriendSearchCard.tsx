"use client";
import axios from "axios";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { userNameAtom } from "../atoms";

export default function FriendSearchCard({
  name,
  image,
}: {
  name: string;
  image: string;
  myUserName: string;
}) {
  const [userNameValue] = useRecoilState(userNameAtom);
  async function addFriend(friend: string) {
    console.log("Friend Added");
    try{
      const friendAdd = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/friend/request`, {
        fromUserName: userNameValue,
        toUserName: friend,
      });
      console.log(friendAdd.data);
      if(friendAdd.data.status === 200){
        console.log("Friend Request Sent");
      }
      if(friendAdd.data.status === 400){
        console.log("Friend Request Already Sent");
        alert("Friend Request Already Sent");
      }
      return friendAdd;
    }catch(err){
      console.log("Error adding friend", err);
      return false;
    }
    
  }
  return (
    <div className="hover:bg-gray-100 cursor-pointer border border-b-gray-200 rounded-xl">
      <div className="flex p-2 gap-2 ">
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full overflow-hidden">
          <Image
            src={image}
            width={50}
            height={50}
            alt="profile"
            style={{
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="flex flex-col justify-centre items-centre h-full w-full text-lg">
          <div className="flex justify-between items-center">
            <div className="py-2">{name}</div>
            <button
              onClick={() => {
                addFriend(name);
              }}
            >
              <Image
                className="cursor-pointer hover:shadow-sm"
                src="/add-user.png"
                width={20}
                height={20}
                alt="add friend"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
