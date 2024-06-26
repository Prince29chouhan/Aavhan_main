import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
})

const Task = mongoose.model('Task', taskSchema)
export default Task;

