"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function WelcomeCard() {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const session = useSession();
  const router = useRouter();
  function buttonHandler() {
    if (name && room) {
      router.push(`/chat/?room=${room}&name=${name}`); // ?room=roomName&name=name
    }
  }
  return (
    <div className="bg-white max-w-xl   rounded-lg shadow-lg p-8  text-center    ">
      <div className="text-4xl font-bold">
        <div>
          {session.status === "authenticated" ? (
            <div>Hey ! {session.data?.user?.name?.split(" ")[0]} 👋</div>
          ) : (
            <div>Hey ! 👋</div>
          )}
        </div>
        <div>Welcome to my app!</div>
      </div>

      <div className="pt-2 px-4">
        Lets start by joining a room quickly and youll be able to chat in
        realtime
      </div>
      <div className="flex flex-col justify-normal px-8 gap-4 mt-4">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Username"
          required
        />

        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          id="room"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Room Number"
          required
        />
        <button
          onClick={buttonHandler}
          className="text-black  max-w-md  sm:mx-32 hover:scale-95 bg-green-400 px-3 py-1.5 rounded-xl border border-gray-300 active:scale-95"
        >
          Enter room
        </button>
      </div>
    </div>
  );
}
