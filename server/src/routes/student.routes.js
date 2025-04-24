import { Router } from "express";
import { addingFeesDetails } from "../controllers/student.controller.js";


const Studentrouter = Router();

Studentrouter.route("/addfeedetail").post(addingFeesDetails) 


export default Studentrouter;
