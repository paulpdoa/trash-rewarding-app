import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserLayout = () => {
    return (
        <main className="h-full">
            <Outlet />
            <Navbar />
        </main>
    )
}

export default UserLayout;