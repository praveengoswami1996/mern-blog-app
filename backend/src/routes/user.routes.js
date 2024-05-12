import express from "express";
import { testRouteController } from "../controllers/user.controller.js";

//Creating a router
const router = express.Router();

router.get("/test", testRouteController); 

export default router;