// import Redis from "ioredis";
// export const connection = new Redis({
//   host:"localhost",
//   port:6379,
// });


import Redis from "ioredis";

export const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("✅ Redis Connected");
});

connection.on("error", (err) => {
  console.log("❌ Redis Error:", err.message);
});