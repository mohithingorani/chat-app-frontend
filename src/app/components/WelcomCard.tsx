"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataAtom } from "../atoms";

export function WelcomeCard() {
  const [name, setName] = useState<string>("User");
  const [room, setRoom] = useState<string>("");
  const userDataValue = useRecoilValue(userDataAtom);


  const session = useSession();
  const router = useRouter();
  function buttonHandler() {
    
    if (name && room) {
      router.push(`/chat/?room=${room}&name=${userDataValue.username}`); // ?room=roomName&name=name
    }
  }
  return (
    <div className="bg-white border h-fits  w-full flex flex-col justify-center items-center  rounded-[25px] shadow-md  p-4  text-center    ">
      <div className="text-4xl font-semibold">
        <div>Have a Good day,</div>

        <div>
          {session.status === "authenticated" ? (
            <div>{session.data?.user?.name?.split(" ")[0]} 👋</div>
          ) : (
            <div>👋</div>
          )}
        </div>
      </div>

      <div className="py-4 px-4">
        Lets start by joining a room quickly and youll be able to chat in
        realtime
      </div>

      <div className="flex justify-center items-center gap-4">
        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          id="room"
          className="bg-gray-50 border max-w-[60%] border-gray-300 text-gray-900 text-sm rounded-[12px] focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 "
          placeholder="Room Number"
          required
        />
        <button
          onClick={buttonHandler}
          className="text-black bg-green-400 hover:bg-green-500 px-3 py-1.5 rounded-xl border border-gray-300 active:scale-95"
        >
          <Image src="/right-arrow.svg" width="20" height="20" alt="arrow" />
        </button>
      </div>
    </div>
  );
}
