import { useState } from 'react'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const NAV_ITEMS = [
  { label: 'Dashboard' },
  {
    label: 'Data Exploration',
    children: ['Make-Model-Model Year', 'Dealer', 'Claims'],
  },
  { label: 'Safety Analytics 360°' },
  { label: 'Competitive Analysis' },
  {
    label: 'Insights',
    children: ['Safety Violation Predictions', 'Recommendations'],
  },
  {
    label: 'Configuration',
    children: ['Data Source', 'Connections', 'User Management', 'Make'],
  },
  { label: 'Manual Data Upload' },
  { label: 'Custom Fields' },
]

export default function Sidebar({ activeItem, setActiveItem, isOpen, onClose, userRole }) {
  //  Default open ONLY
  const [openMenus, setOpenMenus] = useState({
    'Data Exploration': true,
  })

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const handleClick = (item) => {
    setActiveItem(item.label)
    if (item.children) toggleMenu(item.label)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay${isOpen ? ' sidebar-overlay--visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>

        {/* Header */}
        <div className="sidebar__header">
          <MenuRoundedIcon />
          <span className="sidebar__header-title">SAFETY ANALYTICS</span>
        </div>

        {/* Navigation */}

        <ul className="sidebar__nav">
          {NAV_ITEMS.map(item => (
            <li key={item.label} className="sidebar__item">
              <button
                className={`sidebar__btn${activeItem === item.label ? ' sidebar__btn--active' : ''
                  }`}
                onClick={() => handleClick(item)}
              >
                <span className="sidebar__btn-text">{item.label}</span>

                {/* {item.children && (
                  <span className="sidebar__arrow">
                    {openMenus[item.label] ? '▲' : '▼'}
                  </span>
                )} */}

                {item.children && (
                  <span className="sidebar__arrow">
                    {openMenus[item.label] ? (
                      <KeyboardArrowUpRoundedIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowDownRoundedIcon fontSize="small" />
                    )}
                  </span>
                )}

              </button>

              {item.children && (
                <ul
                  className={`sidebar__submenu${openMenus[item.label]
                    ? ' sidebar__submenu--open'
                    : ''
                    }`}
                >

                  {item.children.map(child => {
                    // Hide User Management for non-admin
                    if (child === 'User Management' && userRole !== 'admin') {
                      return null
                    }

                    return (

                      <li
                        key={child}
                        className={`sidebar__subitem${activeItem === child ? ' sidebar__subitem--active' : ''
                          }`}
                        onClick={() => setActiveItem(child)}
                      >
                        {child}
                      </li>

                    )
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>

      </aside>
    </>
  )
}