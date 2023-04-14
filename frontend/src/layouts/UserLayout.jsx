import { useNavigate,Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import Cookie from 'js-cookie';

const UserLayout = () => {

    const existingCookie = Cookie.get('userJwt');   

    const navigate = useNavigate();

    useEffect(() => {
        if(existingCookie === undefined) {
            navigate('/login');
        }
    },[existingCookie,navigate])

    return (
        <main className="h-full">
            <Outlet />
            <Navbar />
        </main> 
    )
} 

export default UserLayout;