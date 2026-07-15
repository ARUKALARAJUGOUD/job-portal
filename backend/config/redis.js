

import Redis from "ioredis";

// export const connection = new Redis(process.env.REDIS_URL, {
//   maxRetriesPerRequest: null,
//   tls: {},
// });


// export const connection = new Redis({
//   host: "127.0.0.1",
//   port: 6379,
//   maxRetriesPerRequest: null,
// });
export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {},
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