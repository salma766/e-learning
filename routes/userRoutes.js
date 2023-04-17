import express from "express";
import userController from "../controllers/userController.js";
import { securedWithAdminToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", securedWithAdminToken, userController.index);
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
