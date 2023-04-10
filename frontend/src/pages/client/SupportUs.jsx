import Navigator from "../../components/Navigator";
import { useState,useEffect } from 'react';
import { HiArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import moment from 'moment';
import Avatar from "../../components/Avatar";
import AlertMssg from "../../components/AlertMssg";

const SupportUs = () => {

    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);
    const [openAlert,setOpenAlert] = useState(false);
    const [alertMssg,setAlertMssg] = useState('');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    const postComment = (e) => {
        e.preventDefault();
        
        axios.post('/comment', { comment, userId, userEmail })
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
                const data = await axios.get('/comment');
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
                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Support Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>

                {/* Comments */}
                <div className="border border-gray-900 rounded-md p-2 mt-10">
                    <h1 className="font-normal text-lg">Comments</h1>

                    { comments.length < 1 ? 
                    <div className="flex justify-between p-3 border-b border-gray-400">
                        <h1 className="text-sm text-gray-400 animate-pulse">No comments yet for this user</h1>
                    </div>
                    :
                     comments?.map((comment) => (
                        <div className="grid grid-cols-5 gap-2 p-3 border-b border-gray-400">
                            <Avatar style="rounded-full col-span-1 w-10 h-10" avatar={comment?.user_id?.profilePicture} />
                            <div className="flex flex-col col-span-3">  
                                <h1 className="font-normal text-gray-900">{comment?.user_id?.firstName }</h1>
                                <p className="text-gray-400 text-sm">{comment?.comment}</p>
                            </div>
                            <span className="text-gray-400 col-span-1 text-sm">{moment().startOf('hour').fromNow()}</span>
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