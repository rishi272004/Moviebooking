import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' // Routing
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MovieDetails'
import SeatLayOut from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'
import {Toaster} from  'react-hot-toast' // Toast notifications
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListsBooking from './pages/admin/ListsBooking'
import { UseAppContext } from './context/AppContext' // Global state
import { SignIn } from '@clerk/clerk-react' // Authentication UI
import Loading from './components/Loading'

/**
 * Main App component with routing
 * Routes: Home, Movies, Bookings, Admin Dashboard
 */
const App = () => {
  // Check if current route is admin page
  const IsAdminRoute = useLocation().pathname.startsWith('/admin')

  // Get user from global context
  const {user} = UseAppContext()

  return (
    <>
      {/* Toast notification system */}
      <Toaster />
      
      {/* NavBar - hide on admin routes */}
      {!IsAdminRoute && <NavBar />}
      
      {/* Route configuration */}
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MoviesDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayOut />} /> {/* Seat booking */}
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path='/loading/:nextUrl' element={<Loading />} />
        <Route path='/favorite' element={<Favorite />} />
        
        {/* Admin routes - protected with authentication */}
        <Route path='/admin/*' element={user ? <Layout /> : (
          <div className='min-h-screen flex justify-center items-center'>
            {/* Show login if not authenticated */}
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-booking' element={<ListsBooking />} />
        </Route>
      </Routes>
      
      {/* Footer - hide on admin routes */}
      {!IsAdminRoute && <Footer />}
    </>
  )
}

export default App
