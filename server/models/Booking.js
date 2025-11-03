import mongoose from "mongoose";

// Schema: Movie Booking (user ticket reservations)
const bookingSchema = new mongoose.Schema({
    user: {type: String, required: true, ref: 'User'}, // User who made the booking
    show: {type: String, required: true, ref: 'Show'}, // Show being booked
    amount: {type: Number, required: true}, // Total price for all seats
    bookedSeats: {type: Array, required: true}, // Array of seat numbers booked (e.g., ["A1", "A2"])
    isPaid: {type: Boolean, default: false}, // Payment status
    paymentLink : {type: String}, // Stripe payment URL
}, {timestamps: true}) // Auto add createdAt, updatedAt

// Create and export Booking model
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;