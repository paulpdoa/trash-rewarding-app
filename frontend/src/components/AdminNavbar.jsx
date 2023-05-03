import { RxHamburgerMenu } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineEmail } from 'react-icons/md';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Cookies from 'js-cookie';

const AdminNavbar = ({setShowSidebar,showSidebar}) => {

    const [showLogout,setShowLogout] = useState(false);

    const adminUser = localStorage.getItem('adminUsername');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const data = await axios.get(`${baseUrl()}/adminlogout`);
            localStorage.removeItem('adminUsername');
            localStorage.removeItem('adminId');
            localStorage.removeItem('adminLocation');
            Cookies.remove('adminJwt');
            navigate(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <nav className="flex justify-around items-center py-4 bg-green-400 text-xl">
            <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-200 font-bold text-2xl"><RxHamburgerMenu /></button>
            <h1 className="text-gray-200 font-semibold">{ adminUser !== null ? adminUser.toUpperCase() : 'No Admin Logged In' }</h1>
            <div className="relative flex items-center gap-2 text-white text-2xl">
                <button onClick={() => setShowLogout(!showLogout)}><CgProfile /></button>
                { showLogout && 
                    <button className="z-50 cursor-pointer absolute top-10 left-0 text-sm bg-gray-800 text-gray-100 p-2 rounded-md" onClick={handleLogout}>Logout</button>
                }
                <Link to='/admin/messages'><MdOutlineEmail /></Link>
            </div>
        </nav>
    )
}

export default AdminNavbar;