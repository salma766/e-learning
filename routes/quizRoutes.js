import express from "express";
import quizController from "../controllers/quizController.js";
import { securedWithUserToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", quizController.index);
router.get("/:id", quizController.show);
router.post("/", securedWithUserToken, quizController.create);
router.put("/:id", securedWithUserToken, quizController.update);
router.delete("/:id", securedWithUserToken, quizController.destroy);

export default router;
