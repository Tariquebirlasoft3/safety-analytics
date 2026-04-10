// This is my Root Component
import { useState, useEffect } from 'react';

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";

import UserManagement from "../pages/UserManagement";


import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



import "../styles/main.scss";

export default function App() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await res.json()
      setUser(json.data)
    }

    fetchUser()
  }, [])

  if (!user) return <div>Loading...</div>


  return (
    <div className="app-layout">

      <TopBar onMenuClick={() => setSidebarOpen(true)} />


      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={user.role}
      />


      <main className="main-content">
        <div className='main-dashboard'>
          <h1 className="topbar__title">Dashboard</h1>
          <div>
            <button className="topbar__btn topbar__btn--outlined">Search
              <SearchOutlinedIcon className='iconsArrow iconSearch' />
            </button>

            <button className="topbar__btn topbar__btn--outlined">Actions
              <KeyboardArrowDownRoundedIcon className='iconsArrow' />
            </button>

            <button className="topbar__btn topbar__btn--contained">Download Report As
              <KeyboardArrowDownRoundedIcon className='iconsArrow' />
            </button>
          </div>
        </div>

        {/* <Dashboard /> */}


        {activeItem === "Dashboard" && <Dashboard />}
        {activeItem === "User Management" && <UserManagement />}


      </main>


    </div>
  )
}
