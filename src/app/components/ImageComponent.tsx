import Image from "next/image";

export default function ImageComponent() {
  return (
    <div className="h-full w-full p-6">
      <div
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
        }}
        className="h-full p-4 rounded-[25px] "
      >
        {/* <div className="bg-white  rounded-[25px] p-4">
          <div className="w-full  flex justify-between rounded-[10px] p-4">
            <div className="rounded-full">
              <Image
                className="rounded-full"
                src={"/avatar.png"}
                width={"50"}
                height={"50"}
                alt="image"
              />
            </div>
            <input
              placeholder="What&apos;s on your mind?"
              className="flex-grow bg-gray-200 rounded-[10px] mx-4 px-3 py-1.5 outline-none "
            />
            <button className="text-blue-500 border bg-blue-100 font-semibold  rounded-[10px] px-3 py-1.5">
              Share Post
            </button>
          </div>
          <div className="pl-4  flex justify-start gap-8">
            <div>Image/Video</div>
            <div>Attatchment</div>
            <div>Live</div>
            <div>Hashtag</div>
            <div>Mention </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
