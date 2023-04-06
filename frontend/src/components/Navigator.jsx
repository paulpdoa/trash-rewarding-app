import { Link } from 'react-router-dom';

const Navigator = ({ currentPage }) => {

    return (
        <button className="top-0 fixed left-0 px-7 z-50 py-5 font-normal text-gray-700 flex gap-1 items-center"><Link className="text-gray-900 font-semibold" to='/'>Home</Link> / {currentPage}</button>
    )
}

export default Navigator;