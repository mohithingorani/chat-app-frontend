const nextConfig = {
  // Your Next.js configuration options go here
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  headers: [
    { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },
    //  { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
    {
      key: "Access-Control-Allow-Headers",
      value: "Content-Type, Authorization",
    },
    { key: "Access-Control-Allow-Credentials", value: "true" }, // Replace with your app's origin
  ],
};

export default nextConfig;
