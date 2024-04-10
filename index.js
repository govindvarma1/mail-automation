import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 

import MailingRoutes from "./routes/MailingRoutes.js"

dotenv.config();
const app = express(); 

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());


app.use("", MailingRoutes);

app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
