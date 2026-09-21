import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of the Farmers Registry' },
  '/farmers': { title: 'Farmers', subtitle: 'Registered farmers' },
  '/farms': { title: 'Farms', subtitle: 'Registered farms' },
  '/crops': { title: 'Crops', subtitle: 'Registered crops' },
  '/regional-prices': { title: 'Regional Prices', subtitle: 'Market prices by crop and region' },
  '/output-verification': { title: 'Output Verification', subtitle: 'Farm output verification records' },
  '/production': { title: 'Production Trends', subtitle: 'Output and analytics by crop and region' },
  '/reports': { title: 'Reports', subtitle: 'Summary reports and exports' },
  '/profile': { title: 'My Profile', subtitle: 'Update your administrator account' },
  '/password': { title: 'Change Password', subtitle: 'Update your account password' },
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const meta = PAGE_TITLES[location.pathname] || { title: 'Farmers Registry', subtitle: '' }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header title={meta.title} subtitle={meta.subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout