import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

// connection
// Queue

export const applicationStatusQueue = new Queue("applicationStatusQueue", {
  connection,
});
