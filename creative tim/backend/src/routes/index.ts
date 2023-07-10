import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middleware/request-validator";
import { SupportedLanguages } from "../types";
import { logger } from "..";
import { handleError } from "../utils/custom-error";
import { ExpertAI } from "../service/expertai";
import { Azure } from "../service/azure";

const router = Router();

router.get("/hello", async (req: Request, res: Response) => {
  res.status(200).send("Hi........ GG! I'm alive sike!!!!!!!!!");
});

router.post(
  "/analyse",
  body("text").isString(),
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      const response = await ExpertAI.analyze(text);
      res.status(200).json({
        response,
      });
    } catch (err) {
      logger.error(err);
      const { statusCode, code, message } = handleError(err);

      res.status(statusCode).json({
        code,
        message,
      });
    }
  }
);

// router.post(
//   "/translate",
//   body("text").isString(),
//   body("language").isString().isIn(Object.values(SupportedLanguages)),
//   validateRequest,
//   async (req: Request, res: Response) => {
//     // if (true) {
//     //   res.status(400).json({
//     //     code: "EC-NA-001",
//     //     message: `Translation is down, please try again after some time`,
//     //   });
//     // }

//     try {
//       const { text, language } = req.body;
//       const response = await Azure.translate(text, language);
//       res.status(200).json({
//         response,
//       });
//     } catch (err) {
//       logger.error(err);
//       const { statusCode, code, message } = handleError(err);

//       res.status(statusCode).json({
//         code,
//         message,
//       });
//     }
//   }
// );

export default router;
