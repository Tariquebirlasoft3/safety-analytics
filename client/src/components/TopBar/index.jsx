import { useState } from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';



export default function TopBar({ onMenuClick }) {


  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || 'User';


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };




  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="topbar__hamburger" onClick={onMenuClick} aria-label="Open menu">
          ☰
        </button>
      </div>

      <div className="topbar__right">
        <button className="topbar__icon-btn" aria-label="Notifications">
          <NotificationsNoneOutlinedIcon style={{ color: '#42a5f5', fontSize: 26 }} />
        </button>


        <div className="topbar__profile">
          <button
            className="topbar__icon-btn"
            onClick={() => setOpen(!open)}
          >
            <AccountCircleOutlinedIcon style={{ color: '#42a5f5', fontSize: 28 }} />
            &nbsp;{userName}
            <KeyboardArrowDownRoundedIcon style={{ color: '#42a5f5', fontSize: 20 }} />
          </button>

          {open && (
            <div className="topbar__dropdown">
              <button>Profile</button>
              <button className='logout' onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>


      </div>

    </header >
  )
}
