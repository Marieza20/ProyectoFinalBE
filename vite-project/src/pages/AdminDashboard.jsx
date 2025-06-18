import React from 'react'
import DashboardAdmin from '../components/Admin/DashboardAdmin'
import AdminPymesList from '../components/Admin/AdminPymesList'

function AdminDashboard() {
  return (
    <div>
        <div className="grid">
          <DashboardAdmin />
          <AdminPymesList />
        </div>
    </div>
  )
}

export default AdminDashboard