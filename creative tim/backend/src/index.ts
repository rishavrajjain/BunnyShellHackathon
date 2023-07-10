//ENV
import { Logger } from "./middleware/log/logger";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import express from "express";

import v1Routes from "./routes/index";
import { logRequest } from "./middleware/log/http-requests-logger";
import moment from "moment-timezone";
import cors from "cors";

export const logger = new Logger();

const start = async () => {
  ["EXPERT_AI_TOKEN"].map((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable ${envVar}`);
    }
  });

  const port = process.env.PORT || 8064;

  const app = express();
  moment().tz("Asia/Kolkata").format();

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest);
  app.use("/v1", v1Routes);
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
};

start();
