import dns from "dns/promises";
import net from "net";

console.log("Checking DNS...");

try {
  const result = await dns.lookup("smtp.gmail.com");
  console.log("DNS Result:", result);
} catch (err) {
  console.error("DNS Error:", err);
}

console.log("Checking SMTP Connection...");

const socket = net.createConnection({
  host: "smtp.gmail.com",
  port: 465,
});

socket.setTimeout(10000);

socket.on("connect", () => {
  console.log("✅ Connected to Gmail SMTP");
  socket.end();
});

socket.on("timeout", () => {
  console.log("❌ SMTP Connection Timed Out");
  socket.destroy();
});

socket.on("error", (err) => {
  console.log("❌ SMTP Error");
  console.error(err);
});