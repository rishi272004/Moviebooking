import { clerkClient } from "@clerk/express";

/**
 * Middleware: Protect admin-only routes
 * Verifies user has 'admin' role in Clerk metadata
 */
export const protectAdmin = async (req, res, next) => {

    try {
        // Get user ID from Clerk authentication context
        const { userId } = req.auth()

        // Fetch user details from Clerk
        const user = await clerkClient.users.getUser(userId)
        
        // Check if user has admin role in private metadata
        if ((user.privateMetadata?.role || '').toLowerCase().trim() !== 'admin') {
            return res.json({ success: false, message: "not authorized" });
        }

        // User is admin, allow access to protected route
        next();
    } catch (error) {
        // Authentication failed
        return res.json({ success: false, message: "not authorized" })
    }
}

