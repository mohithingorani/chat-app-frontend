"use client";

import { welcomeImageBlurDataUrl } from "@/data/base64images";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import LazyLoad from 'react-lazy-load';
export default function Signin() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  const [formState, setFormState] = useState<"signup" | "signin">("signin");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      
      <div
        className="flex flex-col justify-center items-center h-screen bg-slate-300 xl:px-24"
        style={{
          backgroundImage: "url(background.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full py-20 px-[20px]  md:px-[50px]   lg:px-[60px] xl:px-[100px] 2xl:px-[300px]">
          <div className=" bg-white  h-full grid grid-cols-1 md:grid-cols-2 items-center p-[15px] rounded-[50px] shadow-2xl">
            <div className="w-full h-full p-5  lg:p-10 grid-cols-1 overflow-y-hidden overflow-x-hidden ">
              <div>
                <Image src="/newlogo.svg" width="50" height="50" alt="logo" />
              </div>

              <div className=" font-bold  text-6xl mt-8 ">Get started</div>
              {formState == "signup" && (
                <div className="flex gap-1 text-sm md:text-lg text-gray-600 mt-2 ">
                  <div>Already have an account? </div>
                  <button
                    onClick={() => {
                      setFormState("signin");
                    }}
                    className="text-orange-600 hover:underline font-semibold"
                  >
                    Sign in
                  </button>
                </div>
              )}
              {formState == "signin" && (
                <div className="flex gap-1 text-sm md:text-lg text-gray-600 mt-2 ">
                  <div>Create an account? </div>
                  <button
                    onClick={() => {
                      setFormState("signup");
                    }}
                    className="text-orange-600 hover:underline font-semibold"
                  >
                    Sign up
                  </button>
                </div>
              )}
              {formState == "signup" && (
                <div className="mt-8 flex flex-col p-4 rounded-[10px] relative h-fit">
                  <div className="">
                    <div>Name</div>
                    <div className="border border-gray-300 w-full px-4 py-2 rounded-[10px]">
                      <div>
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>Email</div>
                    <div className="border border-gray-300 w-full px-4 py-2 rounded-[10px]">
                      <div>
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>Password</div>
                    <div className="border border-gray-300 w-full px-4 py-2 rounded-[10px] flex justify-between items-center">
                      <div className="flex-grow">
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder="Enter password"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        className="ml-2"
                      >
                        {showPassword && (
                          <Image
                            src="/closedeye.svg"
                            alt="hide"
                            width="20"
                            height="20"
                          />
                        )}
                        {!showPassword && (
                          <Image
                            src="/openeye.png"
                            alt="hide"
                            width="20"
                            height="20"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-500 w-full  py-2 rounded-[10px] mt-8 text-white font-semibold">
                    Sign up
                  </button>
                  <div className="flex justify-center w-full mt-4">or</div>
                  <div className="w-full mt-4">
                    <button
                      onClick={async () => {
                        await signIn("google", {
                          callbackUrl: "http://localhost:3001",
                        });
                      }}
                      className="w-full hover:bg-gray-200 text-center border py-[8px] border-gray-300  rounded-[10px] bg-gray-50 flex justify-center items-center gap-3"
                    >
                      <Image
                        src="/logo.svg"
                        width="30"
                        height="30"
                        alt="google logo"
                      />
                      <div>Sign in with Google</div>
                    </button>
                  </div>
                </div>
              )}
              {formState == "signin" && (
                <div className="mt-8 flex flex-col p-4 rounded-[10px] relative h-fit">
                  <div>
                    <div>Email</div>
                    <div className="border border-gray-300 w-full px-4 py-2 rounded-[10px]">
                      <div>
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>Password</div>
                    <div className="border border-gray-300 w-full px-4 py-2 rounded-[10px] flex justify-between items-center">
                      <div className="flex-grow">
                        <input
                          type="text"
                          className="w-full h-full bg-transparent outline-none"
                          placeholder="Enter password"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        className="ml-2"
                      >
                        {showPassword && (
                          <Image
                            src="/closedeye.svg"
                            alt="hide"
                            width="20"
                            height="20"
                          />
                        )}
                        {!showPassword && (
                          <Image
                            src="/openeye.png"
                            alt="hide"
                            width="20"
                            height="20"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-4">or</div>
                  <div className="w-full mt-4">
                    <button
                      onClick={async () => {
                        await signIn("google", {
                          callbackUrl: "http://localhost:3001",
                        });
                      }}
                      className="w-full hover:bg-gray-200 text-center border py-[8px] border-gray-300  rounded-[10px] bg-gray-50 flex justify-center items-center gap-3"
                    >
                      <Image
                        src="/logo.svg"
                        width="30"
                        height="30"
                        alt="google logo"
                      />
                      <div>Sign in with Google</div>
                    </button>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-500 w-full  py-2 rounded-[10px] mt-8 text-white font-semibold">
                    Sign in
                  </button>
                </div>
              )}
            </div>
            <div className="col-span-0 hidden md:inline-block md:col-span-1 h-full relative overflow-hidden">
              <Image placeholder="blur" blurDataURL={welcomeImageBlurDataUrl} style={{
                borderRadius: "35px",
              }} className="absolute" src={"/welcomeimage2.jpg"} layout="fill" alt="welcome image" />
              <div
                // style={{
                //   backgroundImage: "url(/welcomeimage2.jpg)",
                //   backgroundSize: "cover",
                // }}
                className=" bg-transparent relative top  rounded-[35px] h-full pb-20"
              >
                <div className="pl-10 text-gray-600  text-2xl font-semibold pt-10">
                  <div>connect.</div>

                  <div>chat.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
