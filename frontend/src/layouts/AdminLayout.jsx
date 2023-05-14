import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SidebarMobile from '../components/SidebarMobile';
import { useState,useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminLayout = () => {
    
    const existingCookie = Cookies.get('adminJwt');
    const existingId = localStorage.getItem('adminId');
    
    const [showSidebar,setShowSidebar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(existingId === null) {
            navigate('/admin-login');
        }
    },[existingCookie,navigate,existingId])

    return (
        <main className="h-full relative">
            <AdminNavbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <div className={`md:grid flex md:grid-cols-10 relative h-full`}>
                <SidebarMobile showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
                <Sidebar />
                <Outlet />
            </div>
            
        </main>
    )
}

export default AdminLayout;