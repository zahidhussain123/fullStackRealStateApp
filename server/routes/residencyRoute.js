import express from "express";
import { createResidency, getAllResidencies, getOneResidencies } from "../controllers/residencyController.js";
const router = express.Router()
import jwtCheck from "../config/auth0Config.js"

router.post("/create", jwtCheck, createResidency)
router.get("/residency", getAllResidencies)
router.get("/:id", getOneResidencies)

export {router as residencyRouter}