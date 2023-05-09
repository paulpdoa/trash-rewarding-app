import { baseUrl } from "../baseUrl";

const Avatar = ({ avatar,style }) => {
    const httpServer = `${baseUrl()}/images/`;
    return (
        <img className={`${style} object-cover`} src={`${httpServer}${avatar}`} alt="avatar" />
    )
}

export default Avatar;