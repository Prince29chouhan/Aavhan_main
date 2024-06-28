import express from "express";
import { submitLink, getUserSubmissions } from "../controller/submission.js";
// import { login } from "../controller/user.js";
const router = express.Router();

router.post("/submit", submitLink);
router.get('/user/:userId/submissions', getUserSubmissions);




export default router;