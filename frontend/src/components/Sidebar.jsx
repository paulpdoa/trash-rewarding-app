import { Link } from 'react-router-dom';
import { GoDashboard } from 'react-icons/go';
import { MdOutlineManageAccounts,MdOutlineLeaderboard } from 'react-icons/md';
import { BsXDiamondFill } from 'react-icons/bs';
import { IoMedalOutline } from 'react-icons/io5';
import { BsExclamationCircle } from 'react-icons/bs';
 
const Sidebar = ({ showSidebar,setShowSidebar }) => {

    return (
        <nav className={`${showSidebar ? 'absolute' : 'hidden'} left-0 top-0 h-screen bg-gray-900 w-full z-50 md:w-1/3`}>
            <div className="relative">
                <ul>
                    <li className="px-3 py-5"><h1 className="text-normal text-gray-100">GENERAL</h1></li>
                    <Link onClick={() => setShowSidebar(false)} to='/admin/dashboard'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><GoDashboard />Dashboard</li></Link>
                    <li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><MdOutlineManageAccounts />Accounts</li>
                    <Link onClick={() => setShowSidebar(false)} to='/admin/collection-records'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><BsXDiamondFill />Collection Records</li></Link>
                    <Link onClick={() => setShowSidebar(false)} to='/admin/leaderboard'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><MdOutlineLeaderboard />View Leaderboards</li></Link>
                    <Link onClick={() => setShowSidebar(false)} to='/admin/give-points-rewards'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><IoMedalOutline />Rewarding System</li></Link>
                    <li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><BsExclamationCircle />Generate Reports</li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;