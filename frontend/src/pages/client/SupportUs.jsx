import Navigator from "../../components/Navigator";
import { useState } from 'react';
import { HiArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';

const SupportUs = () => {

    const [comment,setComment] = useState('');
    const nameOfUser = localStorage.getItem('nameOfUser');
    const emailOfUser = localStorage.getItem('emailOfUser');

    const postComment = (e) => {
        e.preventDefault();
        
        axios.post('/comment', { comment, nameOfUser, emailOfUser })
        .then((comment) => {
            alert(comment.data.mssg);
            setComment('');
        })
        .catch((err) => {
            console.log(err);
        })

    } 

    return (
        <div className="h-full relative">
            <Navigator currentPage='Support Us' />            
            <div className="h-full px-10 py-24 w-full">
                <h1 className="font-normal text-center text-xl px-10 py-2 rounded">Support Us</h1>
                <div className="bg-gray-200 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>

                {/* Comments */}
                <div className="border border-gray-900 rounded-md p-2 mt-10">
                    <h1 className="font-normal text-lg">Comments</h1>

                    <div className="flex justify-between p-3 border-b border-gray-400">
                        <img className="rounded-full w-10 h-10" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="profile pic" />
                        <div className="flex flex-col">  
                            <h1 className="font-normal text-gray-900">John Michael</h1>
                            <p className="text-gray-400 text-sm">Good idea!</p>
                        </div>
                        <span className="text-gray-400">3 days ago</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-gray-400">
                        <img className="rounded-full w-10 h-10" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="profile pic" />
                        <div className="flex flex-col">  
                            <h1 className="font-normal text-gray-900">John Michael</h1>
                            <p className="text-gray-400 text-sm">Good idea!</p>
                        </div>
                        <span className="text-gray-400">3 days ago</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-gray-400">
                        <img className="rounded-full w-10 h-10" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="profile pic" />
                        <div className="flex flex-col">  
                            <h1 className="font-normal text-gray-900">John Michael</h1>
                            <p className="text-gray-400 text-sm">Good idea!</p>
                        </div>
                        <span className="text-gray-400">3 days ago</span>
                    </div>

                    
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
        </div>
    )
}

export default SupportUs;