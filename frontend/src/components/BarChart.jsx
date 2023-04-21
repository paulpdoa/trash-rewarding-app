import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const BarChart = ({ chartData,options }) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

    const filterPerMonth = () => {
        //Create array to place exact count of months, in this case this is 12 because of 12 months
        let monthlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0];
        // Loop through the chartData array
        // Update count of monthlyTotals based on the index of the months fetch from the chartData array
        for(let i = 0; i < chartData.length; i++) {
           monthlyTotals[months.indexOf(chartData[i].month)] += Number(chartData[i].pointsAdded); 
        }
        // monthlyTotals[3] = 10;
        // console.log(months.indexOf('January'));
        return monthlyTotals
    }
    
    const data = {
        labels: months,
        datasets: [{
          label: 'User Points',
          data: filterPerMonth(),
             backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ]
        }],
         
      };

    return (
        <Bar data={data} options={options} />
    )
} 

export default BarChart