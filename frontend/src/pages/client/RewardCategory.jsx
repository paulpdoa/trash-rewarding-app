import axios from 'axios';
import { useState,useEffect } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate,Link } from 'react-router-dom';
import Navigator from '../../components/Navigator';

const RewardCategory = () => {

    const [barangay,setBarangay] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchUserBarangay = async () => {
            try {
                const data = await axios.get(`/userdetailget/${userId}`);
                setBarangay(data.data.barangay);
            } catch(err) {

            }
        }
        fetchUserBarangay();

        return () => abortCont.abort();
    })

    return (
        <div className="h-full relative">
            <Navigator currentPage='Rewards' />
            <div className="h-full px-10 py-24">
                <div className="rounded-lg border border-gray-800 p-2 h-auto">
                    <h1 className="text-lg text-gray-900">{barangay}</h1>
                    <p className="text-sm text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, dolorem?</p>
                </div>
                
                <h1 className="mt-20 text-xl">List of Rewards</h1>
                <div className="grid grid-cols-3 gap-3 mt-5">
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                    <div className="flex flex-col items-center bg-gray-200 rounded-md gap-2">
                        <img className="w-20 h-20 object-fit" src="https://static.wixstatic.com/media/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png/v1/fill/w_414,h_302,q_90/2cd43b_fc5e924ef97d4e5b973e2fa49ed26fdc~mv2.png" alt="reward" />
                        <p className="bg-gray-300 p-1 rounded">Rice</p>
                    </div>
                </div> 
                

            </div>
        </div>
    )
}

export default RewardCategory;