import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Rewards = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
            <div className="h-full px-10 py-24">
                <h1 className="bg-gray-300 font-semibold text-2xl w-fit px-10 py-2 rounded">Rewards</h1>    

                <div className="grid grid-cols-3 gap-2 mt-5">
                    <div className="flex bg-gray-200 rounded items-center flex-col gap-2">
                        <img className="w-24 h-24" src="https://static.wixstatic.com/media/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png/v1/fill/w_300,h_300,q_90/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png" alt="reward" />
                        <p className="font-semibold p-2 bg-gray-400 w-full text-center">Button</p>
                    </div>
                    <div className="flex bg-gray-200 rounded items-center flex-col gap-2">
                        <img className="w-24 h-24" src="https://static.wixstatic.com/media/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png/v1/fill/w_300,h_300,q_90/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png" alt="reward" />
                        <p className="font-semibold p-2 bg-gray-400 w-full text-center">Button</p>
                    </div>
                    <div className="flex bg-gray-200 rounded items-center flex-col gap-2">
                        <img className="w-24 h-24" src="https://static.wixstatic.com/media/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png/v1/fill/w_300,h_300,q_90/2cd43b_e0dc6881b3a94ceebe685677277d8a5c~mv2.png" alt="reward" />
                        <p className="font-semibold p-2 bg-gray-400 w-full text-center">Button</p>
                    </div>
                </div>         
            </div>
        </div>
    )
}

export default Rewards;