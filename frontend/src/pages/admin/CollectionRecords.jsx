import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import DateFormatter from '../../components/DateFormatter';

const CollectionRecords = () => {

    const [name,setName] = useState('');
    const [collections,setCollections] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        const signal = abortCont.signal;

        const fetchCollection = async () => {
            try {
                const res = await axios.get(`${baseUrl()}/collections`,{ signal });
                setCollections(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchCollection();

        return () => abortCont.abort();
    },[])

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
                        {/* <th>Quantity</th> */}
                        <th>Date</th>
                    </tr>
                    { collections?.map((collection,pos) => (
                        <tr key={pos}>
                            <td>{collection.user_id.firstName}</td>
                            <td>{collection.material}</td>
                            {/* <td>1 Kilo</td> */}
                            <td><DateFormatter date={collection.createdAt.split('T')[0]} /></td>
                        </tr>
                    )) }
                </table>
            </div>
        </div>
    )
}

export default CollectionRecords;