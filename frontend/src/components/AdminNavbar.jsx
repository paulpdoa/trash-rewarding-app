import { RxHamburgerMenu } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { useNavigate,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Cookies from 'js-cookie';
import { IoMdNotificationsOutline } from 'react-icons/io';

const AdminNavbar = ({setShowSidebar,showSidebar}) => {

    const [showLogout,setShowLogout] = useState(false);
    const [user,setUser] = useState({});
    const [isApproved,setIsApproved] = useState(false);
    const [isClick,setIsClick] = useState(false);

    const adminUser = localStorage.getItem('adminUsername');
    const navigate = useNavigate();

    // For notification

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchNewUser = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/user`,{ signal });
                setUser(data.data[data.data.length - 1]);

                if(data.data[data.data.length - 1].adminApproved) {
                    setIsApproved(false);
                } else {
                    setIsApproved(true);
                }
            } catch(err) {
                console.log(err);
            }
        } 
        fetchNewUser();

        return () => abortCont.abort();
    },[])

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
        <nav className="flex md:fixed top-0 w-full z-50 justify-around md:justify-around items-center py-4 bg-green-400 text-xl">
            <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-200 font-bold text-2xl md:hidden block"><RxHamburgerMenu /></button>
            <h1 className="text-gray-200 font-semibold md:ml-32 ml-0">{ adminUser !== null ? adminUser.toUpperCase() : 'No Admin Logged In' }</h1>
            <div className="relative flex items-center gap-2 text-white text-2xl">
                <button onClick={() => setShowLogout(!showLogout)}><CgProfile /></button>
                { showLogout && 
                    <button className="z-50 cursor-pointer absolute top-10 left-0 text-sm bg-gray-800 text-gray-100 p-2 rounded-md" onClick={handleLogout}>Logout</button>
                }
                <button onClick={() => setIsClick(!isClick)} className="relative">
                    <IoMdNotificationsOutline className="font-bold" />
                    { isApproved && <p className="absolute text-xs right-0 w-4 h-4 p-1 rounded-full flex items-center justify-center bg-red-500 md:top-4 top-4">1</p> }
                </button>
                { isClick && 
                <div className="absolute right-0 md:-mr-28 top-5 text-sm w-auto text-gray-800 z-50 bg-white border border-gray-300 shadow-sm rounded-md p-2">
                    <h1 className="font-semibold">New Registered User:</h1>
                    <p className="flex text-sm items-center gap-2">Email: {user?.email}</p>
                    <Link onClick={() => setIsClick(false)} className="text-xs border-b border-gray-400 text-green-400" to='/admin/accounts'>Click here to approve/reject users</Link>
                </div>
                } 
            </div>
        </nav>
    )
}

export default AdminNavbar;