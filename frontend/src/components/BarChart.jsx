import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const BarChart = ({ chartData,options }) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

    const filterPerMonth = () => {
        let filteredMonth = [];
        let combinedData = [];
        let dateTemp = '';

        for(let i = 0; i < chartData.length; i++) {
            filteredMonth.push({ 
                points: chartData[i].pointsAdded,
                month: chartData[i].month
            });
        }

        for(let y = 0; y < filteredMonth.length; y++) {
            let tempMonth = '';

            
        }

        return filteredMonth;
    }
    
    const data = {
        labels: months,
        datasets: [{
          label: 'User Points',
          data: chartData.map(collection => collection.pointsAdded),
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