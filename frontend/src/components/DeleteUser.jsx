import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useState } from 'react';
import { AiOutlineLoading3Quarters  } from 'react-icons/ai';

const DeleteUser = ({closeDelete,userId}) => {

    const [isLoading,setIsLoading] = useState(false);

    //Delete Reward here
    const deleteUser = async () => {
        setIsLoading(true);
        try {
            const data = await axios.delete(`${baseUrl()}/admindeleteuser/${userId}`);
            alert(data.data.mssg);
            closeDelete(false);
            setIsLoading(false);
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="absolute top-0 bg-black opacity-80 h-screen flex justify-center items-center w-full">
            <div className="w-4/5 rounded-xl gap-2 border border-gray-200 shadow-lg bg-white p-3 h-auto z-50 text-center font-bold flex flex-col items-center justify-center relative">
                { isLoading && <span className="text-green-500 flex items-center justify-center gap-2 text-sm pb-2"><AiOutlineLoading3Quarters className="animate-spin" />Deleting user, please wait...</span> }
                <p className="w-3/5">Are you sure you want to delete this user?</p>
                <div className="justify-center flex items-center gap-2"> 
                    <button onClick={deleteUser} className="text-white bg-green-300 p-2 rounded-md">Yes</button>
                    <button className="text-white bg-red-500 p-2 rounded-md" onClick={() => closeDelete(false)}>No</button>
                </div>
            </div>
        </div>
    )   
}

export default DeleteUser;