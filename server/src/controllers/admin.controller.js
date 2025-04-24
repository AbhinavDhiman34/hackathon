import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Admin } from "../models/admin.model.js";
import { Student } from "../models/student.model.js";
const generateAccessAndRefrshToken = async (adminId) => {
    try {
      const admin = await Admin.findById(adminId);
      const accessToken = admin.generateAccessToken();
      const refreshToken = admin.generateRefreshToken();
      admin.refreshToken = refreshToken;
      await admin.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "SOMETHING went wrong while generating refresh and access token"
      );
    }
  };

// register Admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }
  const totalAdmins = await Admin.countDocuments();
  if (totalAdmins > 0) {
    throw new ApiError(403, "Admin already exists. Only one admin is allowed.");
  }
  const admin = await Admin.create({
    name: name.toLowerCase(),
    email,
    password,
  });
  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );
  if (!createdAdmin) {
    throw new ApiError(500, "SOMETHING went wrong while registering user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Admin created successfully", createdAdmin));
});


// Login Admin
export const adminLogin = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
  
    if ((!email && !name) || !password) {
      throw new ApiError(400, "Email/name and Password are required");
    }
    const admin = await Admin.findOne({
      $or: [{ name }, { email }],
    });
  
    if (!admin) {
      throw new ApiError(404, "Admin does not exist");
    }
    const isMatch = await admin.isPasswordCorrect(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid password");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefrshToken(
      admin._id
    );
  
    const loggedinAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );
  
    // cookies only modifiable from server when  we do httpOnly: true, secure: true
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { admin: loggedinAdmin, accessToken, refreshToken }, // here we are handeling the case where admin wants to set his cokkies him self in his local system may be he wants to login from another device
          "Admin logged in successfully"
        )
      );
  });


  //get student payment success detail
  export const seeAllFeeList = asyncHandler(async (req, res) => {
    const student = await Student.find();
    return res.status(200).json(new ApiResponse(200, student, "fee list of all students"));
  });
  