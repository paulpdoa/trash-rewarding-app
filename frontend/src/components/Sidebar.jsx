import { Link } from 'react-router-dom';
import { GoDashboard } from 'react-icons/go';
import { MdOutlineManageAccounts,MdOutlineLeaderboard,MdOutlineEmail } from 'react-icons/md';
import { BsXDiamondFill } from 'react-icons/bs';
import { IoMedalOutline } from 'react-icons/io5';
import { GiTargetPrize } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi'; 

const Sidebar = () => {

    return (
        <nav className={`hidden md:block col-span-2 left-0 top-0 h-screen bg-gray-900 bg-opacity-80 w-full z-50`}>
            <div className="relative bg-gray-900 w-2/3 md:w-full h-screen">
                <ul>
                    <li className="px-3 py-5"><h1 className="text-normal text-gray-100">GENERAL</h1></li>
                    <Link to='/admin/dashboard'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><GoDashboard />Dashboard</li></Link>
                    <Link to='/admin/accounts'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><MdOutlineManageAccounts />Accounts</li></Link>
                    <Link to='/admin/collection-records'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><BsXDiamondFill />Collection Records</li></Link>
                    <Link to='/admin/leaderboard'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><MdOutlineLeaderboard />View Leaderboards</li></Link>
                    <Link to='/admin/add-rewards'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><GiTargetPrize />Add Rewards</li></Link>
                    <Link to='/admin/add-category'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><BiCategoryAlt />Add Category</li></Link>
                    <Link to='/admin/give-points-rewards'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><IoMedalOutline />Rewarding System</li></Link>
                    <Link to='/admin/messages'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><MdOutlineEmail />Feedbacks</li></Link>
                    {/* <Link to='/admin/reports'><li className="px-3 py-5 text-gray-100 font-semibold text-sm flex items-center gap-2"><BsExclamationCircle />Generate Reports</li></Link> */}
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;