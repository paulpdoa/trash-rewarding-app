import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const History = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
       
            <div className="h-full px-10 py-24">
                <h1 className="bg-gray-300 font-semibold text-2xl w-fit px-10 py-2 rounded">History</h1>    

                <div className="bg-gray-300 w-full p-2 gap-2 rounded mt-5 flex items-center">
                    <div className="text-left">
                        <h1 className="font-semibold">Description</h1>
                        <p className="text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae autem voluptas, maxime eum accusantium officiis mollitia unde rerum quis fugit.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default History;