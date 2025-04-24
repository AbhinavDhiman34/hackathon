import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Student } from "../models/student.model.js";


// adding fee details

export const addingFeesDetails = asyncHandler(async(req,res)=>{
    const{  name , email ,fathername , studentId , course ,branch ,year } = req.body
    const student = await Student.create({
        name: name.toLowerCase(),
        email,
        fathername,
        studentId ,
         course ,
        branch ,
        year
      });

      return res
      .status(200)
      .json(new ApiResponse (200 , student , "student details submitted success"))
})