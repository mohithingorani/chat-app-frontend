"use client";

import "./globals.css";
import AppBar from "./components/AppBar";
import { WelcomeCard } from "./components/WelcomCard";
import Sidebar from "./components/SideBar";
import ImageComponent from "./components/ImageComponent";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userNameAtom } from "./atoms";

export interface userData {
  email: string;
  name: string;
  picture: string;
  username: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [userNameValue, setUserNameValue] = useRecoilState(userNameAtom);

  const session = useSession();
  useEffect(() => {
    const getInfo = async () => {
      try {
        console.log("Searching for user Data");
        if (session.data?.user?.email) {
          const { data } = await axios.get(
            `http://localhost:3000/user/details?email=${session.data.user.email}`
          );
          console.log("API response:", data);
          setUserData(data);
          if (data?.username) {
            setUserNameValue(data.username);
          } else {
            console.error("Username not found in API response.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInfo();
  }, [session.data?.user?.email, setUserNameValue]);

  while (session.data === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {JSON.stringify(session.data?.user?.email)}
      {JSON.stringify(userNameValue)}
      <div className="flex justify-center items-center">
        <AppBar userName={userNameValue} />
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 py-2 md:py-6 md:px-8 lg:px-16 xl:px-32 2xl:px-80">
        <div className="col-span-2 p-2 hidden md:inline-block">
          <div className="h-full w-full border shadow-md rounded-[30px] bg-white ">
            <ImageComponent />
          </div>
        </div>
        <div className="col-span-1 p-2  ">
          <div className="h-full w-full md:border md:shadow-md rounded-[30px] bg-transparent md:bg-white flex flex-col justify-evenly gap-6  items-center p-6">
            <WelcomeCard />
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
