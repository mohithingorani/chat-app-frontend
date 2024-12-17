import Image from "next/image";

export default function FriendCard() {
  return (
    <div className="hover:bg-gray-100 cursor-pointer border border-b-gray-200">
      <div className="flex p-2 ">
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full overflow-hidden">
          <Image
            src="/avatar.png"
            width={50}
            height={50}
            alt="profile"
            style={{
              borderRadius: "50%",
            }}
          />
        </div>

        <div className="flex flex-col justify-between w-full  ml-2">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium">Dev</div>
            <div className="text-xs text-gray-600">15:00</div>
          </div>
          <div className="flex  just items-center">
            <circle className="w-2 h-2 bg-green-500 rounded-full"></circle>
            <div className="flex justify-between w-full ml-1 items-center">
              <div className="text-xs">Online</div>
              <circle className="w-5 text-xs flex justify-center text-white items-center h-5 bg-orange-500 rounded-full">
                2
              </circle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
