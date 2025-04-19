import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function CategoryLayout() {
  return (
    <>
        <Outlet/>
        <Footer/>
    </>
  )
}
