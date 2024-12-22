import Image from "next/image";
import FriendSearchCard from "./FriendSearchCard";

export interface RecivedRequestsCardProps {
  status: string;
  sender: {
    username: string;
    picture: string;
  };
}

export default function RecivedRequestsCard({
  visible,
  recievedRequests,
}: {
  visible: boolean;
  recievedRequests: RecivedRequestsCardProps[];
}) {
  return (
    visible && (
      <div className="absolute  mt-6 bg-white border p-4 rounded-xl shadow-md w-72">
        <div>Pending Requests : {recievedRequests.length}</div>
        <div className="flex flex-col">
          {recievedRequests.length > 0
            ? recievedRequests.map((request: any, key: any) => {
                console.log(request);
                return (
                  <div className="flex justify-start border p-2   " key={key}>
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
                        <button className="text-xs mr-1 flex justify-center items-center py-1 bg-orange-500 text-white font-semibold px-2  ">
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
