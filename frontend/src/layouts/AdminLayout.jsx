import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
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
    },[existingCookie,navigate])

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