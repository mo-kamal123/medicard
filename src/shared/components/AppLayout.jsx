import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
