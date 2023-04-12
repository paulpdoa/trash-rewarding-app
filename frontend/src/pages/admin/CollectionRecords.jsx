import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useState } from 'react';

const CollectionRecords = () => {

    const [name,setName] = useState('');

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Collection Records</button>
            <div className="h-full py-2 px-2"> 
                <div className="flex gap-2 items-center p-2 border border-gray-200 shadow-sm rounded-full">
                    <HiOutlineMagnifyingGlass className="text-xl" />
                    <input onChange={(e) => setName(e.target.value)} type="search" placeholder="Search name..." />
                </div>

                <table className="mt-5">
                    <tr className="text-sm font-normal text-center">
                        <th>Name</th>
                        <th>Materials</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                    <tr>
                        <td>Paul</td>
                        <td>Can</td>
                        <td>1 Kilo</td>
                        <td>April 11, 2023</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CollectionRecords;