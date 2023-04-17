import express from "express";
import responseController from "../controllers/responseController.js";
import { securedWithUserToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", responseController.index);
router.get("/:id", responseController.show);
router.post("/", securedWithUserToken, responseController.create);
router.put("/:id", securedWithUserToken, responseController.update);
router.delete("/:id", securedWithUserToken, responseController.destroy);

export default router;
