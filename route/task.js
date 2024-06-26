import express from 'express';
import { getTask } from '../controller/task.js';

const router = express.Router()


router.get('/', getTask)


export default router;