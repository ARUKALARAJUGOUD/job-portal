import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const emailLoginQueue = new Queue("emailLoginQueue", {
  connection,
});
