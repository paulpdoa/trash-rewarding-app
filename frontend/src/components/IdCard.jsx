import { baseUrl } from "../baseUrl";

const IdCard = ({ id,style }) => {
    const httpServer = `${baseUrl()}/images/`;
    return (
        <img className={`${style} object-cover`} src={`${httpServer}${id}`} alt="id of user" />
    )
}

export default IdCard;