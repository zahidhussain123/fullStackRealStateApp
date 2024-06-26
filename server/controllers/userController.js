import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js"

// export const createUser = asyncHandler(async (req, res) => {
//     let { email } = req.body

//     const userExisted = await prisma.user.findUnique({ where: { email } })
//     const userCreate = await prisma.user.create({ data: req.body })
//     if (userExisted) {
//         res.status(409).send({ message: "User already existed" })
//     } else {
//         res.status(201).send({
//             message: "user created successfully",
//             user: userCreate
//         })
//     }
// })
export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");
  
    let { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
      const user = await prisma.user.create({ data: req.body });
      res.send({
        message: "User registered successfully",
        user: user,
      });
    } else res.status(201).send({ message: "User already registered" });
  });

export const bookVisits = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { email, date } = req.body
    try {
        const alreadyBookedVisit = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                bookedVisits: true
            }
        })
        const isBookedExisted = await alreadyBookedVisit.bookedVisits.some((visit) => visit.id === id)
        if (isBookedExisted) {
            res.send({message: "This is already booked by you"});
        } else {
            const postBookVisit = await prisma.user.update({
                where: {
                    email
                },
                data: {
                    bookedVisits: { push: { id, date} }
                }
            })
            res.status(201).send({ message: "Successfully booked", })
        }
    } catch (error) {
        throw new Error(error.message)
    }
})

export const getAllBookVisits = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const allbooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        res.status(200).send({ message: "Get All Booked Visits", allbooked })
    } catch (error) {
        res.status(500).send({ message: "Internal Server error" })
        throw new Error(error.message)
    }
})

export const cancelBookVisit = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params
    try {
        const getbookedVisit = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        const getIndex = await getbookedVisit?.bookedVisits?.findIndex((visit) => visit.id === id)
        if (getIndex === -1) {
            res.status(404).json({ message: "Booking not found" });
        } else {
            getbookedVisit?.bookedVisits?.splice(getIndex, 1)
            await prisma.user.update({
                where: { email },
                data: {
                    bookedVisits: getbookedVisit?.bookedVisits
                }
            })
            res.send({ message: "Booking Cancelled successfully" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server error" })
        throw new Error(error.message)
    }
})


export const favResidencies = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user.favResidenciesID.includes(rid)) {
            const favouriteRes = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({ message: "Removed from favourite", user: favouriteRes })
        } else {
            const favouriteRes = await prisma.user.update({
                where: {
                    email
                },
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            })
            res.send({ message: "Successfully added to favourite", user: favouriteRes })
        }
    } catch (error) {
        throw new Error(error.message)
    }
})

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const favResd = await prisma.user.findUnique({
        where: { email },
        select: { favResidenciesID: true },
      });
      res.status(201).send(favResd);
    } catch (err) {
      throw new Error(err.message);
    }
  });