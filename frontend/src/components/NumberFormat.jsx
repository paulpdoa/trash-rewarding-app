const NumberFormat = ({points}) => {
    
    let pointFormat = new Intl.NumberFormat().format(points === undefined ? 0 : points);
    return (
        <p>{pointFormat}</p>
    )
}

export default NumberFormat;