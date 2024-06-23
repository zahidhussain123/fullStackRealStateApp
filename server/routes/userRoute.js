import express from "express";
import { createUser, bookVisits, getAllBookVisits, cancelBookVisit, favResidencies } from "../controllers/userController.js";
const router = express.Router();


router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisits)
router.post("/getBookVisit", getAllBookVisits)
router.post("/cancelBookVisit/:id", cancelBookVisit)
router.post("/favResidency/:rid", favResidencies)

export {router as userRoute}