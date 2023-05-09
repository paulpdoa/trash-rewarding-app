import axios from 'axios';
import { baseUrl } from '../baseUrl';

const DeleteMssg = ({closeDelete,rewardId,setCurrentPage}) => {

    //Delete Reward here
    const deleteReward = async () => {
        try {
            const data = await axios.delete(`${baseUrl()}/reward/${rewardId}`);
            alert(data.data.mssg);
            setCurrentPage(data.data.currentPage);
            closeDelete(false);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="absolute top-0 bg-black opacity-80 h-screen flex justify-center items-center w-full">
            <div className="w-4/5 rounded-xl gap-2 border border-gray-200 shadow-lg bg-white p-3 h-auto z-50 text-center font-bold flex flex-col items-center justify-center relative">
                <p className="w-3/5">Are you sure you want to delete this?</p>
                <div className="justify-center flex items-center gap-2"> 
                    <button onClick={deleteReward} className="text-white bg-green-300 p-2 rounded-md">Yes</button>
                    <button className="text-white bg-red-500 p-2 rounded-md" onClick={() => closeDelete(false)}>No</button>
                </div>
            </div>
        </div>
    )   
}

export default DeleteMssg;