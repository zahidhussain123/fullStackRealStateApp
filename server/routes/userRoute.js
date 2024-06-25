import express from "express";
import { createUser, bookVisits, getAllBookVisits, cancelBookVisit, favResidencies } from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js"
const router = express.Router();


router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisits)
router.post("/getBookVisit", jwtCheck, getAllBookVisits)
router.post("/cancelBookVisit/:id", jwtCheck, cancelBookVisit)
router.post("/favResidency/:rid", jwtCheck, favResidencies)

export {router as userRoute}