import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const About = () => {

    const navigate = useNavigate();

    return (
        <div className="h-full relative">
            <button className="top-0 fixed left-0 px-7 py-5 font-semibold text-green-600 flex gap-1 items-center" onClick={() => navigate(-1)}><IoArrowBackCircleOutline />Back</button>
            
            <div className="h-full px-10 py-24">
                <h1 className="bg-gray-300 font-semibold text-2xl w-fit px-10 py-2 rounded">About</h1>

                <div className="bg-gray-300 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-300 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-300 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
                <div className="bg-gray-300 w-full p-2 rounded mt-5">
                    <h2 className="font-semibold">Title Here</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quod ratione a sed sequi mollitia quidem, non doloremque rerum quae.</p>
                </div>
            </div>
        </div>
    )
}

export default About;