import Navigator from "../../components/Navigator";
import { useParams } from 'react-router-dom';

const Learn = () => {

    const { id } = useParams();

    

    return (
        <div className="h-full relative bg-white">
            <Navigator currentPage='Learn' />
            <div className={`h-full py-44 px-5 ${id === '3-R' ? 'three-r-bg' : 'community-bg'}`}> 
                { id === '3-R' ? 
                <p className="text-justify border-2 border-gray-800 p-5">Reducing, reusing, and recycling are the three R's that all work together to lessen the amount of garbage we produce. Natural resources, landfill space, and energy are all conserved. Reducing means choosing to use things with care to reduce the amount of waste generated. Reusing involves the repeated use of items or parts of items which still have usable aspects. Recycling means the use of waste itself as resources. Waste minimization can be achieved in an efficient way by focusing primarily on the first of the 3Rs, reduce, followed by reuse and then recycle. In addition, towns don't need to spend as much money or land on landfills when they apply the three R's.</p>
                :
                <p className="text-justify border-2 border-gray-100 p-5 text-gray-100">Local Government Units (LGU), provide and utilize a platform for managing recyclable waste obtained within their respective communities and ensure the smooth execution of waste management mandated by law.Among the social services and facilities that local government should provide is the solid waste disposal system or environmental management system. According to Schedule 5B of the Constitution, local government is required to offer waste management services, including waste removal, storage, and disposal services. To expand recycling at the municipal level, municipalities must collaborate with business and other stakeholders.</p>
                }
            </div>
        </div>
    )
}

export default Learn;