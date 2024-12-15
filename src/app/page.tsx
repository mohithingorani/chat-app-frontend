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
      <div className=" bg-transparent w-full h-full relative">
        <div className="absolute h-full">
          <Sidebar />
        </div>
        <div className="relative flex flex-col h-full justify-center items-center ">
          <WelcomeCard />
        </div>
      </div>
      <div className="fixed right-0 left-0 bottom-0"></div>
      <Footer />
    </div>
  );
}
