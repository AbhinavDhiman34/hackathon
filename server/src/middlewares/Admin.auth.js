import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";

export const verifyAdminJwt = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
  
     if (!token) {
      throw new ApiError (401, "Unauthorized request")
    }
    
     const decodedToken = await jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )
  
     const admin = await Admin.findById(decodedToken?._id).select("-password -refreshtoken")
     if (!admin) {
      throw new ApiError (401, "Invalid Access Token")
    }
     req.admin = admin // making a new object in req
     console.log(req.admin);
     
     next()
    
  } catch (error) {
    throw new ApiError (401, error.message || "invalid access token")
  }
})