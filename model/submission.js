import mongoose from "mongoose";
import User from "./user.js";
const Schema = mongoose.Schema;

const submissionSchema = mongoose.Schema({
             link: {
                type: String,
                required: true
             },
             author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
})

const Submission = mongoose.model('Submission', submissionSchema)
export default Submission;