import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';



export default function TopBar({ onMenuClick }) {
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

        <button className="topbar__icon-btn" aria-label="Profile">
          <AccountCircleOutlinedIcon style={{ color: '#42a5f5', fontSize: 28 }} />&nbsp;Admin
          <KeyboardArrowDownRoundedIcon style={{ color: '#42a5f5', fontSize: 20 }} /></button>
      </div>

    </header >
  )
}
