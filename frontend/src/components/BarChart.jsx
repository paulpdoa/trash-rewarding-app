import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const BarChart = ({ chartData,options }) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
    const [collections,setCollections] = useState([]);
    const [headers,setHeaders] = useState([]);
    const [totalPoints,setTotalPoints] = useState([]);

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

    // Enhancement - For replacing months to rewards collected
    useEffect(() => {
      const abortCont = new AbortController();
      const signal = abortCont.signal

      const fetchCollection = async () => {
        const totals = [];
        try {
          const data = await axios.get(`${baseUrl()}/collections`,{ signal });
          //const newArr = data.data.filter((val,index,array) => val.barangay === localStorage.getItem('adminLocation') && array.indexOf(val) === index);
          const categs = await axios.get(`${baseUrl()}/category`, { signal });
          setHeaders(categs.data);

          const categoryNames = categs.data.map(categ => categ.category)

          for(let i = 0; i < data.data.length; i++) {
            const filterData = data.data.filter(material => material.materialName === categoryNames[i]);
            const totalQtyMaterials = filterData.reduce((total,collection) => total + Number(collection.quantity.split(' ')[0]) ,0)
          
            if(totalQtyMaterials > 1) {
              totals.push(totalQtyMaterials);
            }
          }
    
          setTotalPoints(totals);
        } catch(err) {
          console.log(err);
        }
      }
      fetchCollection();

      return () => abortCont.abort();
    },[])
    
    const data = {
        // labels:months,
        labels: headers.map(header => header.category),
        datasets: [{
          label: 'Collection Chart',
          // data: filterPerMonth(),
          data: totalPoints,
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