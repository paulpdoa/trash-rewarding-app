import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Rewards = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
            <div className="h-full px-10 py-24">
                <h1 className="bg-gray-300 font-semibold text-2xl w-fit px-10 py-2 rounded">Rewards</h1>              
            </div>
        </div>
    )
}

export default Rewards;