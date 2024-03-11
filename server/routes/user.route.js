import express from "express";
import { register, signin } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// api/register
router.post("/register", register);
// api/signin
router.post("/signin", signin);

export default router;
