import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MovieDetails'
import SeatLayOut from './pages/SeatLayout'
import MyBooking from './pages/MyBooking'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'
import {Toaster} from  'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListsBooking from './pages/admin/ListsBooking'
import { UseAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'

const App = () => {
  const IsAdminRoute = useLocation().pathname.startsWith('/admin')

  const {user} = UseAppContext()

  return (
    <>
      <Toaster />
      {!IsAdminRoute && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MoviesDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayOut />} />
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path='/loading/:nextUrl' element={<Loading />} />

        <Route path='/favorite' element={<Favorite />} />
        <Route path='/admin/*' element={user ? <Layout /> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-booking' element={<ListsBooking />} />
        </Route>
      </Routes>
      {!IsAdminRoute && <Footer />}
    </>
  )
}

export default App
