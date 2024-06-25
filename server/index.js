import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { userRoute } from "./routes/userRoute.js";
import { residencyRouter } from "./routes/residencyRoute.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000
// const corsOptions = {
//     origin: "http://localhost:5173", // Your frontend URL
//     optionsSuccessStatus: 200
// };
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});
app.use("/api/user", userRoute)
app.use("/api/residency", residencyRouter)

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`)
})

