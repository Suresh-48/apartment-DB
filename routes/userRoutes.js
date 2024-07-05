import { Router } from "express";
const router = Router();

import {signup,validateOtp,createUserCredential} from "../controllers/userController.js";

router.route("/signup").post(signup);

router.route("/validate/otp").patch(validateOtp);

router.route("/set/password").patch(createUserCredential);

export default router;
