// This is my Root Component
import { useState } from 'react'

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


import "../styles/main.scss";

export default function App() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">

      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
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

        <Dashboard />
      </main>


    </div>
  )
}
