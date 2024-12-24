"use client";

import TextMessage from "@/app/components/TextMessage";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { createMessage } from "../actions/messages";

export interface MessageObject {
  message: string;
  id: string;
  time: string;
  username: string;
}

export default function Chats() {
  const session = useSession();

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [inbox, setInbox] = useState<MessageObject[]>([]);
  const [message, setMessage] = useState<string>("");
  const [Error, setError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const roomName = searchParams.get("room");
  const name = searchParams.get("name");
  const [myId, setMyId] = useState<string | undefined>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [usersConnected, setUsersConnected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const roomNameString = JSON.stringify(roomName);
  const getTime = () => {
    const dateWithouthSecond = new Date();
    const currentTime = dateWithouthSecond.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return currentTime;
  };

  const handleSendMessage = async () => {
    if (socket) {
      const currentTime = getTime();
      socket.emit("message", message, roomName, myId, currentTime, name);
      setMessage("");
      try {
        await createMessage(message);
      } catch (e) {
        console.log("Error storing message", e);
      }
    }
  };

  useEffect(() => {
    const socket = io(process.env.BACKEND_WEBSOCKET_URL || "ws://localhost:3000");
    socket.on("connect", () => {
      setIsLoading(false);
      console.log("Socket connected");
      setSocket(socket);
      setMyId(socket.id);
      socket.emit("joinRoom", roomName);
      socket.emit("enter", roomName, name);
    });

    socket.on(
      "message",
      (message: string, id: string, currentTime: string, username: string) => {
        if (message.trim() !== "") {
          setInbox((prevInbox) => [
            ...prevInbox,
            { message, id, time: currentTime, username },
          ]);
        }
      }
    );

    socket.on("enter", (userName: string) => {
      setUsersConnected((prevUsers) => [...prevUsers, userName]);
    });

    socket.on("connect_error", (err) => {
      setError(true);
      console.log("connection error");
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName, name]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inbox]);

  if (Error) {
    return <div className="text-white font-">Cant Connect.. Retry</div>;
  }
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <div
        className="flex justify-center h-screen bg-[#222222] "
        style={{
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col max-w-2xl w-full h-[90vh] mt-8">
          <div className=" px-1 text-4xl ml-4">Room : {roomNameString}</div>

          <div className="flex flex-col flex-grow bg-[#0D0D0D] p-8 overflow-y-auto shadow-lg rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  mx-4">
            {inbox.map((messageObject, index) => (
              <TextMessage
                key={index}
                messageObject={messageObject}
                myId={myId}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex justify-between gap-3 p-4 bg-[#0D0D0D] shadow-md rounded-xl mt-4 mx-4">
            <input
              type="text"
              value={message}
              className="w-full outline-none focus:outline-none px-3 py-1.5 resize-none text-white backdrop-filter backdrop-blur-sm border rounded-xl shadow-md border-none "
              style={{ backgroundColor: "#0D0D0D" }}
              placeholder="Enter text"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-500 px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
