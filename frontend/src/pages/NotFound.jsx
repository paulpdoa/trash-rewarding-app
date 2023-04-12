import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col">
            <h1 className="text-9xl font-normal text-green-400">404</h1>
            <p className="text-green-700 text-xl">Page Not Found</p> 

            <img className="mt-10" src="/image/image_2.png" alt="vase" />

            <Link className="w-3/5 rounded-full text-center text-white text-lg bg-green-400 p-2" to='/'>Go Home</Link>
        </div>
    )
}

export default NotFound;