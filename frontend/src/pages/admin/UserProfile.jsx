import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import DateFormatter from '../../components/DateFormatter';
import NumberFormat from '../../components/NumberFormat';
import Avatar from '../../components/Avatar';

const UserProfile = () => {

    const [firstName,setFirstName] = useState('');
    const [middleName,setMiddleName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [province,setProvince] = useState('');
    const [city,setCity] = useState('');
    const [barangay,setBarangay] = useState('');
    const [joinedDate,setJoinedDate] = useState('');
    const [points,setPoints] = useState(0);
    const [status,setStatus] = useState(true);
    const [avatar,setAvatar] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUser = async () => {
            try {
                const data = await axios.get(`/userdetailget/${id}`);
                const joinDate = data.data?.createdAt.split('T')[0];
                
                setFirstName(data.data?.firstName);
                setMiddleName(data.data?.middleName);
                setLastName(data.data?.lastName);
                setProvince(data.data?.province);
                setCity(data.data?.city);
                setBarangay(data.data?.barangay);
                setJoinedDate(joinDate);
                setAvatar(data.data?.profilePicture);
                setPoints(data.data?.collectedPoints);
                setEmail(data.data?.email);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUser();

        return () => abortCont.abort();
    })

    return (
        <div className="h-full relative w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Accounts</button>
            <div className="h-full px-10 py-10 w-full">
                <div className="text-center font-semibold relative flex items-center flex-col gap-2 profile-bg"> 
                    <Avatar style="rounded-full w-32 h-32 border-white border-8 mt-24" avatar={avatar} />
                    <p className="text-gray-500">Personal Information</p>
                    <h1>{firstName} {middleName[0]?.toUpperCase()}. {lastName}</h1>
                    <span className="font-semibold -mt-3 text-gray-300 text-xs">{email}</span>
                    <h2 className="bg-green-300 font-bold p-2">{ status ? 'ACTIVE' : 'INACTIVE'}</h2>
                </div>

                <div className="w-full text-center h-full"> 
                    <div className="shadow-md mt-5 rounded w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Address</h1>
                        <p className="text-gray-400 font-normal">{`${barangay} ${city} ${province}`}</p>
                    </div>
                    <div className="shadow-md rounded mt-5 w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Joined Date</h1>
                        <DateFormatter date={joinedDate} />
                    </div>

                    <h2 className="font-bold mt-5 text-xl">Over View</h2>
                
                    <div className="shadow-md rounded mt-5 w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Collected Points</h1>
                        <p className="text-gray-400 font-normal"><NumberFormat points={points} /></p>
                    </div>
                    <div className="shadow-md rounded mt-5 w-full p-3 border border-gray-100">
                        <h1 className="text-gray-900 font-semibold">Collected Rewards</h1>
                        <div className="flex justify-between items-center p-2 border border-gray-900 rounded-lg">
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                                <tr>
                                    <td>Rice</td>
                                    <td>1 Kilo</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;