import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controller.js";
import { seeAllFeeList } from "../controllers/admin.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { verifyAdminJwt } from "../middlewares/Admin.auth.js";
const router = Router();

router.route("/register").post(registerAdmin) 
router.route("/login").post(adminLogin) 


//secured routes
router.route("/feedeatilsofstudents" ).get(verifyAdminJwt, seeAllFeeList)

export default router;