import { useState,useEffect } from 'react';
import Navigator from '../../components/Navigator';
import axios from 'axios';
import Avatar from '../../components/Avatar';
import NumberFormat from '../../components/NumberFormat';
import { TfiCrown } from 'react-icons/tfi';

const Leaderboards = () => {

    const [users,setUsers] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUsers = async () => {
            try {
                const data = await axios.get('/user');
                setUsers(data.data);
            } catch(err) {
                console.log(err);
            }
            
        }
        fetchUsers();
        
        return () => abortCont.abort();
    },[users])

    return (
        <div className="h-full relative bg-white">
            <Navigator currentPage='Leaderboards' />
            <div className="leaderboard-bg h-full py-44"> 
                <div className="flex justify-between px-5 items-end h-full">
                    { users?.length < 1 ?
                    <div className="flex justify-center items-center bg-green-100 rounded-md w-full h-auto">
                       <p className="animate-pulse text-gray-400 font-semibold">No top 3 rankings yet</p>
                    </div>
                    :
                    users?.sort((first,second) => second.collectedPoints - first.collectedPoints).slice(0,3).map((user,pos) => (
                        <div key={pos} className={`relative ${pos + 1 === 1 ? 'bg-green-300 h-36 order-2' : 'bg-green-100 h-auto order-1'} ${pos + 1 === 3 && 'bg-green-100 h-auto order-3'} rounded-md w-full`}>
                            <div className="relative -top-9 rounded-full flex items-center justify-center">
                                { pos + 1 === 1 && <TfiCrown className="absolute -top-9 text-3xl text-yellow-300 font-bold" /> }
                                <Avatar style="w-20 h-20 rounded-full border-4 border-green-500" avatar={user?.profilePicture}/>
                                <div className="flex items-center absolute -bottom-5 justify-center p-2 bg-green-300 font-semibold text-white w-10 h-10 rounded-full">
                                    <span>{pos + 1}</span>
                                </div>
                            </div>
                            <div className="text-center -mt-2">
                                <h1 className="font-semibold text-gray-500">{user.firstName}</h1>
                                <span className="font-semibold text-gray-900"><NumberFormat points={user.collectedPoints} /></span>
                            </div>
                        </div>
                    ))
                    }
                </div>

                {/* leaderboard rank */}
                <div className="bg-green-50 rounded-tl-2xl rounded-tr-2xl p-2 mt-4">
                    { users?.length < 1 ? 
                    <div className="p-2 w-full border-b border-gray-300">
                        <p className="text-gray-300 animate-pulse font-semibold">No rankings available yet</p>
                    </div>
                    :
                    users?.sort((a,b) => b.collectedPoints - a.collectedPoints).map((user,pos) => (
                        <div key={pos} className="flex p-2 items-center justify-between w-full border-b border-gray-300">
                            <div className="flex items-center gap-2">
                                <Avatar style='w-16 h-16 rounded-full' avatar={user.profilePicture} />
                                <h1 className="text-gray-500 font-semibold">{user.firstName}</h1>
                            </div>
                            <span className="text-gray-500 font-semibold"><NumberFormat points={user.collectedPoints} /></span>
                        </div>
                    ))
                    }
                </div>
            </div>    
        
        </div>
    )
}

export default Leaderboards;