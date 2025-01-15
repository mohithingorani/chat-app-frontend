"use client";

import TextMessage from "@/app/components/TextMessage";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export interface MessageObject {
  id: number;
  message: string;
  time: string;
  userName: string;
  roomName: string;
}


export default function Chats() {
  const { data: session } = useSession(); // Use destructured session data
  const searchParams = useSearchParams();
  const roomName = searchParams.get("room") || "";
  const name = searchParams.get("name") || "";
  

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [inbox, setInbox] = useState<MessageObject[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [usersConnected, setUsersConnected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const friendName = roomName
    .split("-")
    .filter((user) => user !== name)[0] || "Friend";


    function convertDateToTime(date:Date) {
      // Create a Date object from the given date string
      const dateObj = new Date(date);
    
      // Get hours, minutes, and seconds
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();
    
      // Format the time string
      const timeString = `${hours}:${minutes}`;
    
      return timeString;
    }

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages?roomName=${roomName}`
        );
        setInbox(response.data.chats || []);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    fetchMessages();
  }, [roomName]);

  const createMessage = async (message: string) => {
    console.log("Sending message");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create/message`,
        {
          message,
          userName: name,
          roomName,
          time: convertDateToTime(new Date()),
        }
      );

      if (response.status === 200) {
        console.log("Message stored successfully");
      } else {
        console.error("Error storing message", response.data);
      }
    } catch (err) {
      console.error("Error storing message", err);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" || !socket) return;

    // Emit message to the server
    socket.emit("message", message, roomName, name ,convertDateToTime(new Date()), name);
    setMessage("");

    // Save message to the database
    try {
      await createMessage(message);
    } catch (err) {
      console.error("Error storing message", err);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL || "ws://localhost:3000");

    socketInstance.on("connect", () => {
      setIsLoading(false);
      setSocket(socketInstance);

      socketInstance.emit("joinRoom", roomName);
      socketInstance.emit("enter", roomName, name);
    });

    socketInstance.on("message", (message, id, time, userName) => {
      if (message.trim() !== "") {
        setInbox((prevInbox) => [...prevInbox, { message, id, time:time, userName:userName, roomName:roomName }]);
      }
    });

    socketInstance.on("enter", (userName) => {
      setUsersConnected((prevUsers) => [...prevUsers, userName]);
    });

    socketInstance.on("connect_error", () => {
      setError(true);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomName, name]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inbox]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  if (error) {
    return <div className="text-white">Can&apos;t Connect.. Retry</div>;
  }

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <div
      className="flex justify-center h-screen bg-[#222222]"
      style={{
        backgroundImage: `url(/background.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col max-w-2xl w-full h-[90vh] mt-8">
        <div className="px-1 text-4xl ml-4">{friendName}</div>

        <div className="flex flex-col flex-grow bg-[#0D0D0D] p-8 overflow-y-auto shadow-lg rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 mx-4">
          {inbox.map((messageObject, index) => (
            // console.log(messageObject.userName),
            <TextMessage
              key={index}
              messageObject={messageObject}
              myUserName={name}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex justify-between gap-3 p-4 bg-[#0D0D0D] shadow-md rounded-xl mt-4 mx-4">
          <input
            type="text"
            value={message}
            className="w-full outline-none px-3 py-1.5 text-white bg-[#0D0D0D] rounded-xl"
            placeholder="Enter text"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button className="text-white">
            <Image src={"/upload.png"} width="50" height="50" alt="upload"/>
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-green-500 px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
