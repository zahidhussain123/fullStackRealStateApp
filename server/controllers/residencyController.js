import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


export const createResidency = asyncHandler(async (req, res) => {
    let { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data
    try {
        const residency = await prisma.residency.create({
            data: {
                title, description, price, address, city, country, image, facilities,
                owner: { connect: { email: userEmail } }
            }
        })
        console.log("Residency Created:", residency);
        res.send({ message: "Residency  created successfully", residency })
    } catch (error) {
        if (error.code === "P2002") {
            res.status(409).send({ message: "Residency already exists" });
            throw new Error("Residency already existed")
        } else {
            res.status(500).send({message: "Error occured"})
            throw new Error(error.message)
        }
    }

}) 

export const getAllResidencies = asyncHandler( async (req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        res.status(200).send({message: "All Residencies fetched", residencies})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
        throw new Error(error.message)
    }
})

export const getOneResidencies = asyncHandler( async (req, res) => {
    try {
        const residency = await prisma.residency.findUnique({
            where: {
                id: req.params.id,
            }
        })
        res.status(200).send({message: "Unique Residency fetched", residency})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
        throw new Error(error.message)
    }
})