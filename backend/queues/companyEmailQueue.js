import {Queue} from "bullmq";
import { connection } from "../config/redis.js";
export const companyEmailQueue = new Queue("companyEmailQueue",{
  connection
})