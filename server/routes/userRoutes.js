import express from "express";
import { getFavorites, getUserBookings, updateFavorite } from "../controllers/userController.js";

const userRouters = express.Router();

userRouters.get('/bookings', getUserBookings)
userRouters.post('/update-favorite', updateFavorite)
userRouters.get('/favorites', getFavorites)

export default userRouters;

