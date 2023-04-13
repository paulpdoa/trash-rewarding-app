const IdCard = ({ id,style }) => {
    const httpServer = 'http://localhost:8000/images/avatars/';
    return (
        <img className={`${style} object-cover`} src={`${httpServer}${id}`} alt="id of user" />
    )
}

export default IdCard;