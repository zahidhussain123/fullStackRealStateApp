import express from "express";
import { createResidency, getAllResidencies, getOneResidencies } from "../controllers/residencyController.js";
const router = express.Router()


router.post("/create", createResidency)
router.get("/residency", getAllResidencies)
router.get("/:id", getOneResidencies)

export {router as residencyRouter}