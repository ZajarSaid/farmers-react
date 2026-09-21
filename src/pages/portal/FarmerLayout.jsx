import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import FarmerHeader from './FarmerHeader.jsx'
import FarmerSidebar from './FarmerSidebar.jsx'

const PAGE_TITLES = {
  '/me': { title: 'My Dashboard', subtitle: 'Overview of your farms and verification status' },
  '/me/history': { title: 'My History', subtitle: 'Your farms and national rankings' },
  '/me/prices': { title: 'Market Prices', subtitle: 'Regional crop prices for your crops' },
  '/me/register-farm': { title: 'Register Farm', subtitle: 'Add a new farm to your account' },
  '/me/profile': { title: 'My Profile', subtitle: 'Update your personal information' },
  '/me/password': { title: 'Change Password', subtitle: 'Update your account password' },
}

export default function FarmerLayout() {
  const { isAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  const meta = PAGE_TITLES[location.pathname] || { title: 'Farmer Portal', subtitle: '' }

  return (
    <div className="app-shell">
      <FarmerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <FarmerHeader title={meta.title} subtitle={meta.subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}