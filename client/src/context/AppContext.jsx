import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios" // HTTP client
import { useAuth, useUser } from "@clerk/clerk-react" // Authentication
import { useLocation, useNavigate } from "react-router-dom" // Navigation
import toast from "react-hot-toast" // Notifications

// Set API base URL from environment (points to backend)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// Create global context for app state
export const AppContext = createContext()

/**
 * AppProvider: Global state management
 * Provides: user data, admin status, shows, favorite movies
 */
export const AppProvider = ({ children }) => {
    // Global state
    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favoriteMovies, setFavoriteMovies] = useState([])

    // TMDB image base URL for movie posters
    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

    // Clerk authentication
    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    /**
     * Check if current user is admin
     * Redirects to home if not authorized on admin route
     */
    const fetchIsAdmin = async () => {
        try {
            // Get Clerk authentication token
            const token = await getToken();
            
            // Call backend to check admin status
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsAdmin(data.isAdmin);

            // Prevent non-admins from accessing admin dashboard
            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/');
                toast.error('You are not authorized to access admin dashboard');
            }
        } catch (error) {
            console.error("fetchIsAdmin Error:", error); 
        }
    }

    /**
     * Fetch all movie shows from backend
     */
    const fetchShows = async () => {
        try {
            // Get shows list from backend
            const { data } = await axios.get('/api/show/all')
            if (data.success) {
                setShows(data.shows)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setFavoriteMovies(data.movies)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchShows()
    }, [])

    useEffect(() => {
        if (user) {
            fetchIsAdmin()
            fetchFavoriteMovies()
        }
    }, [user])

    const value = { axios, fetchShows, fetchFavoriteMovies, fetchIsAdmin, user, getToken, navigate, isAdmin, shows, favoriteMovies, image_base_url }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export const UseAppContext = () => useContext(AppContext)