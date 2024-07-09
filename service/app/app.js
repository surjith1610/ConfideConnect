import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Stripe from 'stripe'; 
import dotenv from 'dotenv';

import initializeRoutes from "./routes/index.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    mongoose.connect(process.env.MONGO_CONNECTION);
    const db = mongoose.connection;
    db.once('open', () => {
        console.log("Connected to MongoDB successfully :)");
    });

    app.post("/donations", async (req, res) => {
        const { name, email, country, amount, paymentMethodId } = req.body;
        try {
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description: `Donation by ${name} from ${country}`,
                receipt_email: email,
                payment_method: paymentMethodId,
                confirm: true,
                return_url: 'http://localhost:3002/confideconnect/home',  
            });
            console.log("Payment", payment);
            res.json({
                message: "Payment successful",
                success: true
            });
        } catch (error) {
            console.error("Error", error);
            res.json({
                message: "Payment failed",
                success: false,
                error: error.message
            });
        }
    });
    
    
    initializeRoutes(app);
}

export default initialize;
