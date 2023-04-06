import axios from 'axios';
import { useState } from 'react';
import Navigator from '../../components/Navigator';

const Profile = () => {
    
    const [firstName,setFirstName] = useState('Paul');
    const [middleName,setMiddleName] = useState('De Ocampo');
    const [lastName,setLastName] = useState('Andres');
    const [address,setAddress] = useState('Santol Tanza');
    const [status,setStatus] = useState(true);

    return (
        <div className="h-full relative">
            <Navigator currentPage='Profile' />
            <div className="h-full px-10 py-24 w-full">
                <div className="text-center font-semibold relative flex items-center flex-col gap-2 profile-bg"> 
                    <img className="rounded-full w-32 h-32 border-white border-8 mt-24" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="profile pic" />
                    <p className="text-gray-500">Personal Information</p>
                    <h1>{firstName} {middleName[0].toUpperCase()}. {lastName}</h1>
                    <h2 className="bg-green-300 font-bold p-2">{ status ? 'ACTIVE' : 'INACTIVE'}</h2>
                </div>

                <div className="w-full text-center h-full"> 
                    <div className="shadow-md mt-5 rounded w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Address</h1>
                        <p className="text-gray-400 font-normal">Heart Foundation Phase 1-A Purok 7, Barangay Santol, Tanza, Cavite</p>
                    </div>
                    <div className="shadow-md rounded mt-5 w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Joined Date</h1>
                        <p className="text-gray-400 font-normal">May 23, 2023</p>
                    </div>

                    <h2 className="font-bold mt-5 text-xl">Over View</h2>
                
                    <div className="shadow-md rounded mt-5 w-full p-3 border border-gray-100">
                        <h1 className="font-normal">Collected Points</h1>
                        <p className="text-gray-400 font-normal">123,446</p>
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

export default Profile;