import { Link } from 'react-router-dom';

const AdminLogin = () => {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
           <div className="flex flex-col w-4/5 mb-5">
                <h1 className="text-2xl text-green-500 font-bold">Hello there Admin!</h1>
                <p className="text-xs">Empowering the community to increase plastic recovery</p>
           </div>
           <form className="flex flex-col justify-center w-4/5 gap-2">
                <input className="p-2 rounded border-none outline-none shadow-sm" type="email" placeholder="Email" />
                <input className="p-2 rounded border-none outline-none shadow-sm" type="password" placeholder="Password" />

                <button className="p-2 shadow-sm w-1/2 text-center self-center bg-white rounded font-semibold">LOG IN</button>
           </form>
           {/* <p className="text-green-500 font-semibold text-sm mt-2">Don't have an account yet? <Link className="text-gray-800" to='/register'>Register</Link></p> */}
        </div>
    )
}

export default AdminLogin