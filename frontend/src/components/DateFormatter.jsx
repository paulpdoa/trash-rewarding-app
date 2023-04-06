const DateFormatter = ({ date }) => {

    const monthList = ['January','February','March','April','May','June','July','August','September']

    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    return (
        <span className="text-gray-400 font-normal">{ monthList[parseInt(month,10)] } { day }, { year } </span>
    )
}

export default DateFormatter;