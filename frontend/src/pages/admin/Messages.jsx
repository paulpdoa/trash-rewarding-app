import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Avatar from '../../components/Avatar';
import moment from 'moment';
import { baseUrl } from '../../baseUrl';

const Messages = () => {

    const [comments,setComments] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchComments = async() => {
            try {
                const data = await axios.get(`${baseUrl()}/comment`);
                setComments(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchComments();

        return () => abortCont.abort();
    },[])

    return (
        <div className="h-full relative bg-white w-full">
            <button className="px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/admin/dashboard'>Home</Link> / Messages</button>
            <div className="h-full py-20 px-5"> 
                <div className="border border-gray-900 rounded-md p-2 mt-10">
                    <h1 className="font-normal text-lg">Comments</h1>

                    { comments.length < 1 ? 
                    <div className="flex justify-between p-3 border-b border-gray-400">
                        <h1 className="text-sm text-gray-400 animate-pulse">No comments yet for this user</h1>
                    </div>
                    :
                     comments?.map((comment,pos) => (
                        <div key={pos} className="grid grid-cols-5 gap-2 p-3 border-b border-gray-400">
                            <Avatar style="rounded-full col-span-1 w-10 h-10" avatar={comment?.user_id?.profilePicture} />
                            <div className="flex flex-col col-span-3">  
                                <h1 className="font-normal text-gray-900">{comment?.user_id?.firstName }</h1>
                                <p className="text-gray-400 text-sm">{comment?.comment}</p>
                            </div>
                            <span className="text-gray-400 col-span-1 text-sm">{moment.utc(`${comment?.createdAt.split('.')[0].split('T')[0]} ${comment?.createdAt.split('.')[0].split('T')[1]}`).local().startOf('seconds').fromNow()}</span>
                            {}
                        </div>
                    )) 
                }
                </div>
            </div>
        </div>
    )
}

export default Messages;