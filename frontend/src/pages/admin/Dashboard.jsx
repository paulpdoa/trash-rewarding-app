import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [

    ]
}

const Dashboard = () => {
    return (
        <div className="h-full w-full">
            <div className="h-full px-10 py-24">
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}

export default Dashboard;