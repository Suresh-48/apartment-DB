import { Router } from "express";
const router = Router();

import {signup,validateOtp,createUserCredential} from "../controllers/userController.js";

router.route("/signup").post(signup);


export default router;
