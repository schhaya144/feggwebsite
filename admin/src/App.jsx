import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'

const App = () => {
  return (
    <>
      <main className="">
        <Outlet />
      </main>
    </>
  )
}

export default App
