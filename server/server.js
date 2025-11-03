import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouters from "./routes/userRoutes.js";
import { stripeWebHooks } from "./controllers/stripeWebHooks.js";

const app = express();
const port = 3000;

await connectDB()

// Stripe Webhook Route 
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebHooks)

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware()) 

// API Routes
app.get('/', (req, res) => res.send('Server is live!'));
app.use("/api/inn   gest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouters)

app.listen(port,  ()=> console.log(`Server is listing at http://localhost:${port}`))