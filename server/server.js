// Import dependencies
import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express' // Authentication middleware
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js" // Background jobs
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouters from "./routes/userRoutes.js";
import { stripeWebHooks } from "./controllers/stripeWebHooks.js"; // Payment webhooks

const app = express();
const port = 3000;

// Connect to MongoDB database
await connectDB()

// Handle Stripe payment webhooks (raw body needed for signature verification)
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebHooks)

// MIDDLEWARE: Setup core middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Requests
app.use(clerkMiddleware()) // Add user authentication context

// ROUTES: Setup API endpoints
app.get('/', (req, res) => res.send('Server is live!')); // Health check
app.use("/api/inngest", serve({ client: inngest, functions })); // Background job service
app.use('/api/show', showRouter) // Movie show endpoints
app.use('/api/booking', bookingRouter) // Booking management
app.use('/api/admin', adminRouter) // Admin operations
app.use('/api/user', userRouters) // User profile endpoints

// Start server on port 3000
app.listen(port,  ()=> console.log(`Server is listing at http://localhost:${port}`))