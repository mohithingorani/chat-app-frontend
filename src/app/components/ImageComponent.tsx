export default function ImageComponent() {
  return (
    <div className="h-full w-full p-6">
      <div
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
        }}
        className="h-full p-4 rounded-[25px] "
      ></div>
    </div>
  );
}
