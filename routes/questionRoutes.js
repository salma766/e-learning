import express from "express";
import questionController from "../controllers/questionController.js";
import { securedWithUserToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", questionController.index);
router.get("/:id", questionController.show);
router.post("/", securedWithUserToken, questionController.create);
router.put("/:id", securedWithUserToken, questionController.update);
router.delete("/:id", securedWithUserToken, questionController.destroy);

export default router;
