import Image from "next/image";
import FriendSearchCard from "./FriendSearchCard";
import axios from "axios";
import { MouseEventHandler, useEffect } from "react";

export interface RecivedRequestsCardProps {
  status: string;
  sender: {
    username: string;
    picture: string;
    id: number;
  };
  receiver: {
    username: string;
    picture: string;
    id: number;
  };
}



export default function RecivedRequestsCard({
  visible,
  recievedRequests,
  onMouseOver,
  onMouseOut
}: {
  visible: boolean;
  recievedRequests: RecivedRequestsCardProps[];
  onMouseOver?: MouseEventHandler<HTMLDivElement> | undefined
  onMouseOut?: MouseEventHandler<HTMLDivElement> | undefined
}) {
  

async function addFriend(fromId: number, toId: number, requestId: number) {
  try {
    const addFriend = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/friend/accept`, {
      senderId: fromId,
      receiverId: toId, // Corrected spelling
      requestId: requestId,
    });
    return addFriend;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}


  return (
    visible && (
      <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} className="absolute  mt-6 bg-white border p-4 rounded-xl shadow-md w-72">
        <div>Pending Requests : {recievedRequests.filter((request)=>request.status==="pending").length}</div>
        <div className="flex flex-col">
          {recievedRequests.length > 0
            ? recievedRequests.map((request: any, key: any) => {
                console.log(request);
                
                return (
                  
                  request.status==="pending"&&<div className="flex justify-start border p-2   " key={key}>
                    <div className="w-[50px] h-[50px] mr-2 rounded-full overflow-hidden ">
                      <Image
                        alt="profile picture"
                        src={request.sender.picture}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="">
                      <div className="text-lg">{request.sender.username}</div>
                      <div className="flex">
                        <button
                          onClick={() =>
                            addFriend(
                              request.sender.id,
                              request.receiver.id,
                              request.id
                            )
                          }
                          className="text-xs mr-1 flex justify-center items-center py-1 bg-orange-500 text-white font-semibold px-2  "
                        >
                          Confirm
                        </button>
                        <button className="text-xs flex justify-center items-center py-1 border  border-red-500   px-2  ">
                          Delete Request
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    )
  );
}
