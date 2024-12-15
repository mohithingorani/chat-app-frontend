"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import TextMessage2 from "../components/TextMessage2";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Use ES6 import

export interface MessageObject {
  message: string;
  id: string;
  time: string;
  username: string;
}

const fetchValue = async (prompt: string, context: string[]) => {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    );
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const myPrompt = `
      You are a content generator for my website. 
      Please provide clear, concise, and engaging text responses based on the input prompt. 
      You are a therapist who provides online therapy. Be very friendly and supportive.
      Understand the context and provide a response that is relevant to the user's input.
      uses Cognitive Behavioral Therapy (CBT), mindfulness techniques, and stress management tools to help  feel more in control of their emotions.
      Do not use stars or any special characters in your responses. 
      Only output plain text. 
      Try to make small responses as it is chat. Not compulsory, just a suggestion.
      Don't use * or # in response.    
      Make the content short.
      This is the context: ${context.join(" ")}. // Join the context array into a single string
      The content should be suitable for a general audience and formatted appropriately for web display. 
      Make sure the response is informative, accurate, and directly related to the input prompt.
      The prompt is: ${prompt}.
    `;

    const result = await model.generateContent(myPrompt);
    return result.response.text;
  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw error;
  }
};

export default function Chats() {
  const [context, setContext] = useState<string[]>([]);
  const [inbox, setInbox] = useState<MessageObject[]>([]);
  const [message, setMessage] = useState<string>("");
  const [Error, setError] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  const getTime = () => {
    const dateWithoutSecond = new Date();
    const currentTime = dateWithoutSecond.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return currentTime;
  };

  async function handleSendMessage() {
    if (!message.trim()) return;
    const myMessage: MessageObject = {
      message: message,
      id: "user",
      time: getTime(),
      username: "User ",
    };
    setInbox((prevInbox) => [...prevInbox, myMessage]);
    setMessage("");
    setIsLoading(true);
    try {
      const contextArray = inbox.map((messageObject) => messageObject.message);
      setContext(contextArray); // Update the context state
      console.log("Fetching value with context:", context);
      const responseText = await fetchValue(message, context);
      console.log("Response received:", responseText);
      setResponse(responseText);
      if (responseText) {
        const newMessage: MessageObject = {
          message: responseText(),
          id: "bot",
          time: getTime(),
          username: "Bot",
        };
        setInbox((prevInbox) => [...prevInbox, newMessage]);
        setMessage("");
      }
    } catch (e) {
      console.error("Error fetching chat response", e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inbox]);

  if (Error) {
    return <div className="text-white">Can&apos;t Connect.. Retry</div>;
  }

  return (
    <>
      <div
        className="flex justify-center h-screen bg-[#222222]"
        style={{
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col max-w-2xl w-full h-[90vh] mt-8">

          <div className="flex flex-col flex-grow bg-[#0D0D0D] p-8 overflow-y-auto shadow-lg rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 mx-4">
            {inbox.map((messageObject, index) => (
              <TextMessage2
                key={index}
                messageObject={messageObject}
                myId={"user"} // Ensure this is the correct value
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex justify-between gap-3 p-4 bg-[#0D0D0D] shadow-md rounded-xl mt-4 mx-4">
            <input
              type="text"
              value={message}
              className="w-full px-3 py-1.5 resize-none text-white backdrop-filter backdrop-blur-sm border rounded-xl shadow-md border-none"
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
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
