import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = () => {

    const [showSidebar,setShowSidebar] = useState(false);

    return (
        <main className="h-full relative">
            <AdminNavbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <div className={`flex relative`}>
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <Outlet />
            </div>
        </main>
    )
}

export default AdminLayout;