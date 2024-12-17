"use client";

import "./globals.css";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { WelcomeCard } from "./components/WelcomCard";
import Sidebar from "./components/SideBar";
import Image from "next/image";
import ImageComponent from "./components/ImageComponent";
// export default function Home() {
//   return (
//     <div className="flex flex-col h-screen ">
//       <AppBar />
//       <div className=" bg-transparent w-full h-full ">
//         <div className="absolute h-full m-4">
//           <Sidebar />
//         </div>
//         <div className=" flex flex-col h-full justify-center items-center ">
//           <WelcomeCard />
//         </div>
//       </div>
//       <div className="fixed right-0 left-0 bottom-0"></div>
//       <Footer />
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 py-2 md:py-6 md:px-16 lg:px-16 xl:px-32 2xl:px-80">
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
