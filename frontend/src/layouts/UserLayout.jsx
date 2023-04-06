import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserLayout = () => {

    const cookie = document.cookie.split('=');
    const existingCookie = cookie[1];   

    const navigate = useNavigate();

    useEffect(() => {
        if(existingCookie === undefined) {
            navigate('/login');
        }
    },[])

    return (
        <main className="h-full">
            <Outlet />
            <Navbar />
        </main> 
    )
} 

export default UserLayout;