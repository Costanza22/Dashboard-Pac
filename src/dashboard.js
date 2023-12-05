
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState({
    labels: ['Temperatura', 'Umidade'],
    datasets: [
      {
        label: 'Medições',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [0, 0],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('API');
        const { temperatura, umidade } = response.data;

        setData({
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              data: [temperatura, umidade],
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchData();
  }, [data]); 

  return (
    <div>
      <h2>Dashboard de Temperatura e Umidade</h2>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;
