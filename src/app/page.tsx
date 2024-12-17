"use client";

import "./globals.css";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { WelcomeCard } from "./components/WelcomCard";
import Sidebar from "./components/SideBar";
export default function Home() {
  return (
    <div className="flex flex-col h-screen ">
      <AppBar />
      <div className=" bg-transparent w-full h-full ">
        <div className="absolute h-full m-4">
          <Sidebar />
        </div>
        <div className=" flex flex-col h-full justify-center items-center ">
          <WelcomeCard />
        </div>
      </div>
      <div className="fixed right-0 left-0 bottom-0"></div>
      <Footer />
    </div>
  );
}
