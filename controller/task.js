import Task from "../model/task.js";

export const getTask = async(req, res)=>{
    try {
        const task = await Task.find()
        res.status(200).json(task)
        
    } catch (error) {
        res.status(404).json({message: error.message}) 
    }

}