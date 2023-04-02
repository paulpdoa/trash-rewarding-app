import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';

const AdminLayout = () => {

    const [showSidebar,setShowSidebar] = useState(false);

    return (
        <main className="h-full relative">
            <button onClick={() => setShowSidebar(!showSidebar)} className="absolute py-5 px-2 text-3xl text-green-600"><RxHamburgerMenu /></button>
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Outlet />
        </main>
    )
}

export default AdminLayout;