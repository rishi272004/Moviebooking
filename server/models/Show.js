import mongoose from "mongoose";

// Schema: Movie Show (screening details)
const showSchema = new mongoose.Schema(
    {
        movie: {type: String, require: true, ref: 'Movie'}, // Movie reference
        showDateTime: {type: Date, require: true}, // When the show is scheduled
        showPrice: {type: Number, require: true}, // Ticket price per seat
        occupiedSeats: {type: Object, default:{}} // Tracks which seats are booked (e.g., {"A1": true, "A2": true})
    }, {minimize: false}
)

// Create and export Show model
const Show = mongoose.model("Show", showSchema)

export default Show;