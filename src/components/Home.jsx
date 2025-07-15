import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'
import Hero from './Hero'
import useGetAllComplaints from './Hooks/useGetAllComplaints'

const Home = () => {
    useGetAllComplaints();
  
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Home