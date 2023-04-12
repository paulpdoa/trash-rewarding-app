import { RxHamburgerMenu } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdminNavbar = ({setShowSidebar,showSidebar}) => {
    return (
        <nav className="flex justify-around items-center py-4 bg-green-400 text-xl">
            <button onClick={() => setShowSidebar(!showSidebar)} className="text-gray-200 font-bold text-2xl"><RxHamburgerMenu /></button>
            <h1 className="text-gray-200 font-semibold">ADMIN</h1>
            <div className="flex items-center gap-2 text-white text-2xl">
                <CgProfile />
                <Link to='/admin/messages'><MdOutlineEmail /></Link>
            </div>
        </nav>
    )
}

export default AdminNavbar;