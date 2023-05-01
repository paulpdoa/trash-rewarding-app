import Navigator from "../../components/Navigator";
import { useState,useEffect } from 'react';
import { HiArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import moment from 'moment';
import Avatar from "../../components/Avatar";
import AlertMssg from "../../components/AlertMssg";
import { baseUrl } from "../../baseUrl";

const SupportUs = () => {

    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);
    const [openAlert,setOpenAlert] = useState(false);
    const [alertMssg,setAlertMssg] = useState('');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    const postComment = (e) => {
        e.preventDefault();
        
        axios.post(`${baseUrl()}/comment`, { comment, userId, userEmail })
        .then((data) => {
            setComments(comment => [...comments,comment[0]])
            setAlertMssg(data.data.mssg)
            setOpenAlert(true);
        })
        .catch((err) => {
            console.log(err);
        })
    } 

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchComment = async () => {
            try {
                const data = await axios.get(`${baseUrl()}/comment`);
                setComments(data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchComment();

        return () => abortCont.abort();
    },[])


    return (
        <div className="h-full relative">
            <Navigator currentPage='Support Us' />            
            <div className="h-full px-10 py-24 w-full">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">Support Us</h1>
                <div className="border border-gray-800 w-full p-2 rounded-md mt-5">
                    <p>Help us to improve our project by giving us feedback and suggestions. We really appreciate your feedback to us and read it carefully to be us to be better. Thankyou!</p>
                </div>

                {/* Comments */}
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
                {/* Feedback */}
                <div className="border border-gray-900 rounded-md p-2 mt-10">
                    <h1 className="font-normal text-lg">Your Feedback</h1>

                    <div className="flex items-center gap-2">
                        <input className="p-2 border-b border-gray-400 w-full outline-none" type="text" placeholder="Comment..." onChange={(e) => setComment(e.target.value)} />
                        <button className="text-4xl" onClick={postComment}><HiArrowCircleLeft /></button>
                    </div>
                </div>

            </div>
            { openAlert && <AlertMssg message={alertMssg} redirect={'/'} /> }
        </div>
    )
}

export default SupportUs;