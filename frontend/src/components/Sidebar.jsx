import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar,setShowSidebar }) => {

    return (
        <nav className={`${showSidebar ? 'fixed' : 'hidden'} left-0 top-0 h-full bg-gray-300 w-1/2 z-50 md:w-1/3`}>
            <div className="relative">
                <button onClick={() => setShowSidebar(!showSidebar)} className="absolute right-4 top-6 text-xl font-bold text-red-500"><RxCross1 /></button>
                <ul>
                    <li className="px-3 py-5 border-b-2 border-gray-900"><h1 className="text-lg">Hello Admin!</h1></li>
                    <li className="px-3 py-5 border-b-2 border-gray-900 text-sm">Accounts</li>
                    <li className="px-3 py-5 border-b-2 border-gray-900 text-sm">Collection Records</li>
                    <li className="px-3 py-5 border-b-2 border-gray-900 text-sm"><Link onClick={() => setShowSidebar(false)} to='/admin/leaderboard'>View Leaderboards</Link></li>
                    <li className="px-3 py-5 border-b-2 border-gray-900 text-sm"><Link onClick={() => setShowSidebar(false)} to='/admin/give-points-rewards'>Give Points/Rewards</Link></li>
                    <li className="px-3 py-5 border-b-2 border-gray-900 text-sm">Generate Reports/Rewards</li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;