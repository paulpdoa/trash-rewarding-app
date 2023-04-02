import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Sidebar = ({ showSidebar,setShowSidebar }) => {

    return (
        <nav className={`${showSidebar ? 'fixed' : 'hidden'} left-0 top-0 h-full bg-gray-200 w-1/2 z-50 md:w-1/3`}>
            <div className="relative">
                <button onClick={() => setShowSidebar(!showSidebar)} className="absolute right-4 top-6 text-xl font-bold text-red-500"><RxCross1 /></button>
                <ul>
                    <li className="px-3 py-5 border-b-2 border-green-600"><h1 className="text-xl font-semibold text-green-600">Hello Admin!</h1></li>
                    <li className="px-3 py-5 border-b-2 border-green-600 text-green-600 font-semibold text-sm">Accounts</li>
                    <li className="px-3 py-5 border-b-2 border-green-600 text-green-600 font-semibold text-sm">Collection Records</li>
                    <li className="px-3 py-5 border-b-2 border-green-600 text-green-600 font-semibold text-sm"><Link onClick={() => setShowSidebar(false)} to='/admin/leaderboard'>View Leaderboards</Link></li>
                    <li className="px-3 py-5 border-b-2 border-green-600 text-green-600 font-semibold text-sm"><Link onClick={() => setShowSidebar(false)} to='/admin/give-points-rewards'>Give Points/Rewards</Link></li>
                    <li className="px-3 py-5 border-b-2 border-green-600 text-green-600 font-semibold text-sm">Generate Reports/Rewards</li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar;