const NumberFormat = ({points}) => {
    
    let pointFormat = new Intl.NumberFormat().format(points === undefined ? 0 : points);
    return (
        <>{pointFormat}</>
    )
}

export default NumberFormat;