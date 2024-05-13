import { Router } from "express";
import signUpController from "./controllers/signUpController.js";
import signInController from "./controllers/signInController.js";
import getUserController from "./controllers/getUserController.js";
import authMiddleware from "./middlewares.js";

const router = Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/user/:userId", authMiddleware, getUserController);

export default router;
