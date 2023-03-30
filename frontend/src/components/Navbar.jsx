import { AiOutlineHome,AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdQrCodeScanner } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    return (
        <nav className="fixed bottom-0 w-full">
            <ul className="flex relative bg-gray-100 p-3 justify-around">
                <Link className="flex flex-col items-center text-green-600" to='/'>
                    <AiOutlineHome className="text-3xl"/>
                    <li className="text-xs">Home</li>
                </Link>
               <Link className="flex flex-col items-center text-green-600" to='/about'>
                    <AiOutlineExclamationCircle className="text-3xl" />
                    <li className="text-xs">About</li>
               </Link>
               <button className="absolute -top-8 rounded-full border-white border-8 w-20 h-20 text-2xl flex justify-center items-center text-gray-100 p-2 qr__icon"><MdQrCodeScanner /></button>
            </ul>
        </nav>
    )
}

export default Navbar;