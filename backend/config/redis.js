

// import Redis from "ioredis";

// export const connection = new Redis({
//   host: "localhost",
//   port: 6379,
//   maxRetriesPerRequest: null,
// });

// connection.on("connect", () => {
//   console.log("✅ Redis Connected");
// });

// connection.on("error", (err) => {
//   console.log("❌ Redis Error:", err.message);
// });



import Redis from "ioredis";

export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("✅ Redis Connected");
});

connection.on("ready", () => {
  console.log("🚀 Redis Ready");
});

connection.on("error", (err) => {
  console.log("❌ Redis Error:", err.message);
});

connection.on("close", () => {
  console.log("⚠️ Redis Connection Closed");
});