import { useNavigate,Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import Cookie from 'js-cookie';

const UserLayout = ({ currentPage }) => {

    const existingCookie = Cookie.get('userJwt');  
    const existingId = localStorage.getItem('userId'); 
    const navigate = useNavigate();

    useEffect(() => {
        if(existingId === null) {
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