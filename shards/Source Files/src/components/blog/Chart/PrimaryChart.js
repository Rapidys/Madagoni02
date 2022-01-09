import React from 'react';
import {Bar} from 'react-chartjs-2'
import {Card, CardBody} from "shards-react";

const PrimaryChart = ({chartData}) => {
  return (
    <div className={"w-100 mb-5 p-3"}>
      <Card>
        <CardBody>
          <Bar
            height={300}

            data={{
              labels: chartData.chartData && chartData.chartData.map(item => item.chartTitle),
              datasets: [

                {
                  label: '# ქულა / %',
                  data: chartData.chartData && chartData.chartData.map(item => item.chartData),

                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }
              ],
            }}
            options={{
              responsive: true,
              aspectRatio: 1,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                },

              }
            }}
          />
        </CardBody>
      </Card>

    </div>
  );
};

export default PrimaryChart;
