import express from "express";
import { signup, login, updateUser } from "../controller/user.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update", updateUser);



export default router;