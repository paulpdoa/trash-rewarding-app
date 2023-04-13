const Avatar = ({ avatar,style }) => {
    const httpServer = 'http://localhost:8000/images/avatars/';
    return (
        <img className={`${style} object-cover`} src={`${httpServer}${avatar}`} alt="avatar" />
    )
}

export default Avatar;