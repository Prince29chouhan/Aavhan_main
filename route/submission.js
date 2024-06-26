import express from "express";
import { submitLink } from "../controller/submission.js";
// import { login } from "../controller/user.js";
const router = express.Router();

router.post("/submit", submitLink);


export default router;