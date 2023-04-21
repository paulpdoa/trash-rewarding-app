import { useNavigate,Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const UserLayout = ({ currentPage }) => {

    const existingCookie = Cookies.get('userJwt');  
    //const existingId = localStorage.getItem('userId'); 
    const navigate = useNavigate();

    useEffect(() => {
        if(existingCookie === undefined) {
            navigate('/login');
        }
    },[existingCookie,navigate])

    return (
        <main className="h-full">
            <Outlet />
            <Navbar currentPage={currentPage} />
        </main> 
    )
} 

export default UserLayout;