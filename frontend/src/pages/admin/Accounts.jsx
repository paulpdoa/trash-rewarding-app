import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import DateFormatter from '../../components/DateFormatter';
import AlertMssg from '../../components/AlertMssg';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import UserDetails from '../../components/UserDetails';

const Accounts = () => {

    const [openAlert,setOpenAlert] = useState(false);
    const [redirect,setRedirect] = useState('');
    const [mssg,setMssg] = useState('');
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [loadMssg,setLoadMssg] = useState('');
    const [showDetails,setShowDetails] = useState(false);
    const [currentPage,setCurrentPage] = useState('Member Accounts');
    const [userId,setUserId] = useState('');
    const adminId = localStorage.getItem('adminId');

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchUsers = async () => {
            try {
                const data = await axios.get('/user',{ signal });
                setUsers(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUsers();
    },[users])

    const approveUser = async (id) => {
        setIsLoading(true)
        setLoadMssg('Approving user');
        try {
            const data = await axios.patch(`/adminapproveuser/${id + '-' + adminId}`);
            setLoadMssg('');
            setIsLoading(false);
            setOpenAlert(true);
            setMssg(data.data.mssg);
            setRedirect(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    const rejectUser = async (id) => {
        setIsLoading(true);
        setLoadMssg('Rejecting user');
        try {
            const data = await axios.post(`/adminrejectuser`,{id});
            setLoadMssg('');
            setIsLoading(false);
            setOpenAlert(true);
            setMssg(data.data.mssg);
            setRedirect(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    const deactivateUser = async (id) => {
        setIsLoading(true);
        setLoadMssg('Deleting user');
        try {
            const data = await axios.delete(`/admindeleteuser/${id}`);
            setLoadMssg('');
            setIsLoading(false);
            setOpenAlert(true);
            setMssg(data.data.mssg);
            setRedirect(data.data.redirect);
        } catch(err) {
            console.log(err);
        }
    }

    const getUserDetails = (id) => {
        setShowDetails(true);
        setUserId(id);
    }

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Member Accounts</button>
            <div className="h-full py-20 pt-5 px-5"> 
                { isLoading && <span className="text-green-500 flex items-center justify-center gap-2 text-sm pb-2"><AiOutlineLoading3Quarters className="animate-spin" />{loadMssg}, please wait...</span>}
                {/* Page Navigation */}
                <nav className="flex items-center justify-center">
                    <button className={`${currentPage === 'Member Accounts' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => setCurrentPage('Member Accounts')}>Member Accounts</button>
                    <button className={`${currentPage === 'For Approvals' ? 'bg-gray-300' : 'bg-gray-200'} text-sm text-gray-500 p-2`} onClick={() => setCurrentPage('For Approvals')}>For Approvals</button>
                </nav>
                
                {
                 currentPage === 'Member Accounts' ?
                 /* For Member Accounts Page */
                <table className="mt-5">
                    <tr>
                        <th className="font-normal text-xs">Name</th>
                        <th className="font-normal text-xs">Date Registered</th>
                        <th className="font-normal text-xs">Status</th>
                        <th className="font-normal text-xs">Actions</th>
                    </tr>
                    { users?.map((user,pos) => (
                        <tr key={pos}>
                            <td className="font-normal text-xs text-gray-900 underline"><Link to={`/admin/userprofile/${user._id}`}>{user.firstName} {user.lastName}</Link></td>
                            <td className="font-normal text-xs text-gray-900"><DateFormatter date={user.createdAt.split('T')[0]}/></td>
                            <td className="font-normal text-xs text-gray-900">{ user.status && user.adminApproved ? 'Active' : 'Inactive'}</td>
                            <td className="font-normal text-xs text-gray-900">
                                <button onClick={() => deactivateUser(user._id)}>Deactivate</button>
                            </td>
                        </tr>
                    )) }
                </table>   
                :
               /* For Approvals Page */
               <table className="mt-5">
                    <tr>
                        <th className="font-normal text-xs">Name</th>
                        <th className="font-normal text-xs">Date Registered</th>
                        <th className="font-normal text-xs">Actions</th>
                    </tr>
                    { users?.filter(user => !user.adminApproved).map((user,pos) => (
                        <tr key={pos}>
                            <td onClick={() => getUserDetails(user._id)} className="font-normal text-xs text-gray-900 underline">{user.firstName} {user.lastName}</td>
                            <td className="font-normal text-xs text-gray-900"><DateFormatter date={user.createdAt.split('T')[0]}/></td>
                            <td className="font-normal text-xs text-gray-900 flex-col flex gap-2">
                                <button onClick={() => approveUser(user._id)} className="bg-green-500 text-gray-100 text-xs p-1">Approve</button>
                                <button onClick={() => rejectUser(user._id)} className="bg-red-500 text-gray-100 text-xs p-1">Reject</button>
                            </td>
                        </tr>
                    )) }
                </table>   
                }
            </div>
            { openAlert && <AlertMssg message={mssg} redirect={redirect} /> }
            { showDetails && <UserDetails userId={userId} closeDetails={setShowDetails} /> }
        </div>
    )
}

export default Accounts;