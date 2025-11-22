import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaEnvelopeOpenText } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="admin-panel-layout">
      {/* Sidebar */}
      <aside className="apl-sidebar">
        <h2 className="apl-logo">Admin Panel</h2>
        <nav className="apl-nav">
          <NavLink to="/admin/users" className="apl-link">
            <FaUser />
            <span>Users</span>
          </NavLink>
          <NavLink to="/admin/contacts" className="apl-link">
            <FaEnvelopeOpenText />
            <span>Contacts</span>
          </NavLink>
        </nav>
      </aside>
      <main className="apl-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
