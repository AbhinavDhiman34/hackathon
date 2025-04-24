import mongoose from "mongoose"



const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        
        unique: true
    },
    email: {  
        type: String,
        
        unique: true
    },
    fathername: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },

}, { timestamps: true })



export const Student =  mongoose.model("Student", studentSchema)