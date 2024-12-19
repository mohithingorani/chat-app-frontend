"use client";

import "./globals.css";
import AppBar from "./components/AppBar";
import { WelcomeCard } from "./components/WelcomCard";
import Sidebar from "./components/SideBar";
import ImageComponent from "./components/ImageComponent";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

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

  const session = useSession();
  useEffect(() => {
    const getInfo = async () => {
      console.log("Searching for user Data");
      if (!session.data?.user?.email) return;
      const userData = await axios.get(
        `http://localhost:3000/user/details?email=${session.data.user.email}`
      );
      setUserData(userData.data);
    };
    getInfo();
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex justify-center items-center">
        <AppBar userName={userData?.username} />
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
